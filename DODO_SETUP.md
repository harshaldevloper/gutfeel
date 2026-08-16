# Dodo Payments — Webhook setup for GutVista

Webhook URL (Cloudflare Pages):
```
https://gutvista.pages.dev/api/dodo/webhook
```

## Events to subscribe (minimum)

In **Dodo Dashboard → Developer → Webhooks → your endpoint → Edit**, enable:

| Event | Why |
|-------|-----|
| `subscription.active` | User paid — grant Premium |
| `subscription.renewed` | Monthly/yearly renewal |
| `subscription.on_hold` | Payment failed — pause access |
| `subscription.cancelled` | User cancelled |
| `subscription.expired` | Subscription ended |
| `subscription.failed` | Creation failed |
| `subscription.plan_changed` | Upgrade/downgrade |
| `subscription.updated` | Metadata or status change |
| `payment.succeeded` | Backup confirmation |
| `payment.failed` | Mark on_hold |

Optional (only if you want them):
- `dunning.started` / `dunning.recovered` — failed payment recovery
- `abandoned_checkout.*` — cart recovery emails (not needed for MVP)
- `refund.succeeded` — handle refunds manually for now

## Cloudflare environment variables

**There is no public link** — you must log in at https://dash.cloudflare.com/

Path: **Workers & Pages → gutvista → Settings → Environment variables**

See **CLOUDFLARE_SETUP.md** for full step-by-step instructions.

```
DODO_API_KEY=...
DODO_PREMIUM_PRODUCT_ID=...
DODO_ANNUAL_PRODUCT_ID=...
DODO_WEBHOOK_SECRET=whsec_...
SUPABASE_URL=https://njnluxdbvpccsawgdzxw.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
```

**Note:** The webhook URL returns 404 until you push the `functions/` folder and GitHub Actions redeploys. Missing env vars cause 503, not 404.

## Checkout flow

1. User signs in at `/login`
2. Goes to `/account` → clicks Premium/Annual
3. Checkout passes `user_id` in metadata to Dodo
4. Webhook receives `subscription.active` → writes to `subscriptions` table
5. App reads plan via `getSubscription(userId)`

## Testing

Use **Dodo Dashboard → Webhooks → your endpoint → Testing → Send example** for `subscription.active`.

Dashboard test events are **unsigned** — our handler accepts them when signature headers are missing (dev only).

For production, always verify `webhook-signature` header is present on real events.

## Supabase

Run `supabase-schema.sql` (now idempotent — safe to re-run).

If you only need the new tables after a partial run, use `supabase-migration-patch.sql` instead.
