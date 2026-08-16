# Cloudflare + Dodo setup

## Why webhook returns 404

The live site is still on an **old commit** without the `functions/` folder. Until you push and deploy:

- `GET /api/dodo/webhook` → **404** (route does not exist)
- After deploy → **405** (route exists, POST only)
- After env vars set → **503** if secrets missing, **200** on valid Dodo POST

Dodo dashboard may show both "404" and "405" depending on whether the route existed when each attempt ran.

---

## Deploy path (two systems)

**Primary:** Cloudflare Pages is connected to GitHub (`gutvista` repo). **Push to `main`** triggers a Cloudflare build automatically.

**Secondary:** GitHub Action `.github/workflows/deploy.yml` also deploys via Wrangler. If it fails with `Authentication error` (401), regenerate your Cloudflare API token and update GitHub repo secret `CF_API_TOKEN` (needs **Cloudflare Pages Edit** permission). This does not block Cloudflare Git deploys.

Build settings Cloudflare should use (also in `wrangler.toml`):

| Setting | Value |
|---------|-------|
| Build command | `npm ci && npm run build` |
| Output directory | `out` |
| Root directory | `/` (repo root) |

The `functions/` folder at repo root is picked up automatically for `/api/*` routes.

---

## Step 1 — Push code

```bash
cd fodmap-planner
git add .
git commit -m "Add Dodo webhook/checkout, logo, auth pages, deploy fix"
git push origin main
```

Wait for Cloudflare Pages build (Dashboard → gutvista → Deployments). Then test:

```bash
curl -sI https://gutvista.pages.dev/api/dodo/webhook | head -1
# Expect: HTTP/2 405
```

---

## Step 2 — Set env vars in Cloudflare

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **gutvista**
2. **Settings** → **Environment variables** → **Production**
3. Add:

| Variable | Source |
|----------|--------|
| `DODO_API_KEY` | Dodo → Developer → API keys |
| `DODO_PREMIUM_PRODUCT_ID` | Dodo → Products → monthly product ID |
| `DODO_ANNUAL_PRODUCT_ID` | Dodo → Products → annual product ID |
| `DODO_WEBHOOK_SECRET` | Dodo → Developer → Webhooks → signing secret |
| `SUPABASE_URL` | `https://njnluxdbvpccsawgdzxw.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → service_role |

Mark secrets as **Encrypted**. **Retry deployment** after saving.

---

## Step 3 — Verify

1. Browser GET `/api/dodo/webhook` → **405** (not 404)
2. Dodo → send test webhook → row in Supabase `dodo_webhook_events`
3. `/account/` → Premium checkout → Dodo redirect

**Order:** Push → wait for deploy → set env vars → retry deploy → test webhook in Dodo.