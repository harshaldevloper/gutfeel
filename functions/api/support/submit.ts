/** Optional Cloudflare fallback — app and web submit directly to Supabase via anon RLS. */
interface Env {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
}

type TicketBody = {
  email?: string;
  subject?: string;
  message?: string;
  category?: string;
  user_id?: string;
};

async function supabaseInsert(env: Env, row: Record<string, unknown>) {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/support_tickets`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(row),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase insert failed: ${res.status} ${text}`);
  }
  return res.json();
}

export const onRequestGet: PagesFunction<Env> = async () =>
  new Response("Method Not Allowed", { status: 405 });

export const onRequestPost: PagesFunction<Env> = async context => {
  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = context.env;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return Response.json({ error: "Support backend not configured" }, { status: 503 });
  }

  let body: TicketBody;
  try {
    body = await context.request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const subject = body.subject?.trim();
  const message = body.message?.trim();
  const category = body.category ?? "general";
  const allowed = ["general", "bug", "billing", "feature", "health"];

  if (!email || !subject || !message) {
    return Response.json({ error: "email, subject, and message are required" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }
  if (!allowed.includes(category)) {
    return Response.json({ error: "Invalid category" }, { status: 400 });
  }
  if (message.length > 4000 || subject.length > 200) {
    return Response.json({ error: "Message too long" }, { status: 400 });
  }

  try {
    const [ticket] = await supabaseInsert(context.env, {
      email,
      subject,
      message,
      category,
      user_id: body.user_id ?? null,
      status: "open",
    });
    return Response.json({ ok: true, id: ticket?.id ?? null });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Failed to submit ticket" },
      { status: 500 }
    );
  }
};
