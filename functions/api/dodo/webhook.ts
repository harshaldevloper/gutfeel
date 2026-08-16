/**
 * Dodo Payments webhook handler (Standard Webhooks spec)
 * Endpoint: POST https://gutvista.pages.dev/api/dodo/webhook
 *
 * Subscribe to these events in Dodo Dashboard → Developer → Webhooks:
 *
 * REQUIRED (subscription lifecycle):
 *   subscription.active
 *   subscription.renewed
 *   subscription.on_hold
 *   subscription.cancelled
 *   subscription.expired
 *   subscription.failed
 *   subscription.plan_changed
 *   subscription.updated
 *
 * RECOMMENDED (payment confirmation):
 *   payment.succeeded
 *   payment.failed
 *
 * OPTIONAL (dunning / recovery):
 *   dunning.started
 *   dunning.recovered
 *
 * You do NOT need abandoned_checkout.* unless you build cart-recovery emails.
 */

interface Env {
  DODO_WEBHOOK_SECRET: string;
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
}

type SubStatus = "active" | "on_hold" | "cancelled" | "expired" | "failed";

interface DodoWebhookEvent {
  business_id?: string;
  type?: string;
  timestamp?: string;
  data?: Record<string, unknown>;
}

function mapEventToStatus(eventType: string): SubStatus | null {
  switch (eventType) {
    case "subscription.active":
    case "subscription.renewed":
    case "dunning.recovered":
      return "active";
    case "subscription.on_hold":
    case "dunning.started":
    case "payment.failed":
      return "on_hold";
    case "subscription.cancelled":
      return "cancelled";
    case "subscription.expired":
      return "expired";
    case "subscription.failed":
      return "failed";
    case "subscription.plan_changed":
    case "subscription.updated":
    case "payment.succeeded":
      return "active";
    default:
      return null;
  }
}

function extractSubscriptionPayload(data: Record<string, unknown>) {
  const metadata = (data.metadata ?? {}) as Record<string, string>;
  const customer = data.customer as Record<string, unknown> | undefined;

  const subscriptionId =
    (data.subscription_id as string) ??
    (data.id as string) ??
    (data.subscription as Record<string, unknown> | undefined)?.subscription_id as string;

  const customerId =
    (data.customer_id as string) ??
    (customer?.customer_id as string) ??
    (customer?.id as string);

  const periodEnd =
    (data.current_period_end as string) ??
    (data.next_billing_date as string) ??
    (data.period_end as string);

  return {
    subscriptionId,
    customerId,
    metadata,
    periodEnd,
    productId: data.product_id as string | undefined,
  };
}

async function supabaseRequest(
  env: Env,
  path: string,
  method: string,
  body: unknown,
  prefer?: string
) {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
    apikey: env.SUPABASE_SERVICE_ROLE_KEY,
    "Content-Type": "application/json",
  };
  if (prefer) headers.Prefer = prefer;

  return fetch(`${env.SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers,
    body: JSON.stringify(body),
  });
}

async function logEvent(env: Env, eventType: string, eventId: string | null, payload: unknown) {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) return;
  await supabaseRequest(env, "dodo_webhook_events", "POST", {
    event_type: eventType,
    dodo_event_id: eventId,
    payload,
  });
}

async function upsertSubscription(
  env: Env,
  opts: {
    userId: string;
    subscriptionId: string;
    customerId?: string;
    plan: "premium" | "annual";
    status: SubStatus;
    periodEnd?: string;
  }
) {
  await supabaseRequest(
    env,
    "subscriptions?on_conflict=dodo_subscription_id",
    "POST",
    {
      user_id: opts.userId,
      dodo_subscription_id: opts.subscriptionId,
      dodo_customer_id: opts.customerId ?? null,
      plan: opts.plan,
      status: opts.status,
      current_period_end: opts.periodEnd ?? null,
      updated_at: new Date().toISOString(),
    },
    "resolution=merge-duplicates"
  );
}

async function updateBySubscriptionId(
  env: Env,
  subscriptionId: string,
  status: SubStatus,
  periodEnd?: string
) {
  await supabaseRequest(
    env,
    `subscriptions?dodo_subscription_id=eq.${encodeURIComponent(subscriptionId)}`,
    "PATCH",
    {
      status,
      current_period_end: periodEnd ?? null,
      updated_at: new Date().toISOString(),
    }
  );
}

function inferPlan(metadata: Record<string, string>, productId?: string): "premium" | "annual" {
  if (metadata.tier === "annual") return "annual";
  if (metadata.plan === "annual") return "annual";
  // Set DODO_ANNUAL_PRODUCT_ID in env and pass from checkout metadata
  return "premium";
}

export const onRequestGet: PagesFunction<Env> = async () => {
  return new Response("Webhook endpoint — send POST requests from Dodo Payments only.", {
    status: 405,
    headers: { Allow: "POST" },
  });
};

export const onRequestPost: PagesFunction<Env> = async context => {
  const secret = context.env.DODO_WEBHOOK_SECRET;
  if (!secret) {
    return new Response("DODO_WEBHOOK_SECRET not configured", { status: 503 });
  }

  const rawBody = await context.request.text();
  const eventId = context.request.headers.get("webhook-id");
  const webhookTimestamp = context.request.headers.get("webhook-timestamp");
  const webhookSignature = context.request.headers.get("webhook-signature");

  // Standard Webhooks: verify when all headers present (skip for dashboard test events — unsigned)
  if (webhookSignature && webhookTimestamp && eventId) {
    const valid = await verifyStandardWebhook(rawBody, eventId, webhookTimestamp, webhookSignature, secret);
    if (!valid) {
      return new Response("Invalid webhook signature", { status: 401 });
    }
  }

  let event: DodoWebhookEvent;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const eventType = event.type ?? "";
  const data = event.data ?? {};

  await logEvent(context.env, eventType, eventId, event);

  const status = mapEventToStatus(eventType);
  if (!status) {
    // Ignored events: abandoned_checkout.*, credit.*, dispute.*, payout.*, etc.
    return Response.json({ received: true, ignored: eventType });
  }

  const { subscriptionId, customerId, metadata, periodEnd, productId } =
    extractSubscriptionPayload(data);

  const userId = metadata.user_id;
  const plan = inferPlan(metadata, productId);

  if (userId && subscriptionId) {
    await upsertSubscription(context.env, {
      userId,
      subscriptionId,
      customerId,
      plan,
      status,
      periodEnd,
    });
  } else if (subscriptionId) {
    await updateBySubscriptionId(context.env, subscriptionId, status, periodEnd);
  }

  return Response.json({ received: true, type: eventType, status });
};

/** Standard Webhooks HMAC-SHA256 verification (https://standardwebhooks.com) */
async function verifyStandardWebhook(
  rawBody: string,
  msgId: string,
  timestamp: string,
  signatureHeader: string,
  secret: string
): Promise<boolean> {
  try {
    const keyBytes = decodeWebhookSecret(secret);
    const signedContent = `${msgId}.${timestamp}.${rawBody}`;
    const key = await crypto.subtle.importKey(
      "raw",
      keyBytes,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const sigBuffer = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signedContent));
    const expected = base64Encode(new Uint8Array(sigBuffer));

    // Header format: "v1,<base64sig>" or multiple space-separated versions
    for (const part of signatureHeader.split(" ")) {
      const [, sig] = part.split(",");
      if (sig && timingSafeEqual(sig, expected)) return true;
      if (sig && timingSafeEqual(sig, expected.replace(/=+$/, ""))) return true;
    }
    return false;
  } catch {
    return false;
  }
}

function decodeWebhookSecret(secret: string): Uint8Array {
  const raw = secret.startsWith("whsec_") ? secret.slice(6) : secret;
  const binary = atob(raw);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function base64Encode(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}
