interface Env {
  DODO_API_KEY: string;
  DODO_PREMIUM_PRODUCT_ID?: string;
  DODO_ANNUAL_PRODUCT_ID?: string;
}

export const onRequestPost: PagesFunction<Env> = async context => {
  const apiKey = context.env.DODO_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "DODO_API_KEY not configured on Cloudflare" }, { status: 503 });
  }

  let body: { tier?: string; email?: string; user_id?: string };
  try {
    body = await context.request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const tier = body.tier === "annual" ? "annual" : "premium";
  const productId =
    tier === "annual"
      ? context.env.DODO_ANNUAL_PRODUCT_ID
      : context.env.DODO_PREMIUM_PRODUCT_ID;

  if (!productId) {
    return Response.json(
      { error: `DODO_${tier.toUpperCase()}_PRODUCT_ID not configured. Create products in Dodo dashboard.` },
      { status: 503 }
    );
  }

  const origin = new URL(context.request.url).origin;
  const returnUrl = `${origin}/account/?checkout=success`;

  const metadata: Record<string, string> = { tier };
  if (body.user_id) metadata.user_id = body.user_id;

  const payload = {
    product_cart: [{ product_id: productId, quantity: 1 }],
    customer: body.email ? { email: body.email, name: body.email.split("@")[0] } : undefined,
    return_url: returnUrl,
    metadata,
  };

  const res = await fetch("https://api.dodopayments.com/checkouts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    return Response.json({ error: data.message ?? "Dodo checkout failed" }, { status: res.status });
  }

  return Response.json({
    checkout_url: data.checkout_url ?? data.url,
  });
};
