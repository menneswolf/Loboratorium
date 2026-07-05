# Going Live — Owner's Checklist

A friendly, step-by-step guide to putting Loboratorium online, on
**Vercel + Neon**. For the technical reference, see [DEPLOYMENT.md](DEPLOYMENT.md).

Legend: ✅ = already done in the repo · 🧑 = you need to do this (needs your
accounts/keys).

---

## Accounts you'll need
🧑 GitHub · Vercel (sign in with GitHub) · Neon · your existing Mollie & Sendcloud · a domain (optional).

---

## 1. Code is ready ✅
- All features are committed on the `main` branch.
- The repo runs locally on SQLite out of the box and is ready to switch to Postgres for production.

🧑 **Push to GitHub** (one-time). Create an empty **private** repo on github.com called `loboratorium`, then:
```bash
cd "F:/F/website"
git remote add origin https://github.com/YOUR-USERNAME/loboratorium.git
git push -u origin main
```
Your secrets (`.env`, `env`) are gitignored and will NOT be uploaded.

---

## 2. Database — Neon 🧑
1. neon.tech → **New Project** → region **Europe (Frankfurt)**.
2. Reset the password (old credentials were once exposed).
3. Copy the **pooled** string → `DATABASE_URL`, and the **direct/unpooled** string → `DATABASE_URL_UNPOOLED`.

---

## 3. Switch the app to Postgres 🧑
Edit `prisma/schema.prisma` datasource to:
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DATABASE_URL_UNPOOLED")
}
```
Put the two Neon strings in your local `.env`, then load your products into Neon:
```bash
npm install
npm run db:push
npm run db:seed
git add prisma/schema.prisma && git commit -m "Use Postgres" && git push
```

---

## 4. Your login secret ✅ generated / 🧑 to paste
A ready-to-use `NEXTAUTH_SECRET` was generated for you in chat — paste it into Vercel (Step 5).
Regenerate anytime with:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 5. Deploy on Vercel 🧑
Import the GitHub repo at vercel.com, framework auto-detects as Next.js. Add these
**Environment Variables**, then Deploy:

| Name | Value |
|---|---|
| `DATABASE_URL` | Neon pooled |
| `DATABASE_URL_UNPOOLED` | Neon direct |
| `NEXTAUTH_SECRET` | generated secret |
| `NEXTAUTH_URL` | your site URL |
| `PUBLIC_BASE_URL` | your site URL |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | your admin login |
| `MOLLIE_API_KEY` | Mollie **test** key first |
| `SENDCLOUD_PUBLIC_KEY` / `SENDCLOUD_SECRET_KEY` | from Sendcloud |
| `SENDCLOUD_SHIPPING_METHOD_ID` | your chosen method |
| `SENDCLOUD_FROM_*` | your sender address |
| `GEMINI_API_KEY` | optional |
| `BLOB_READ_WRITE_TOKEN` | auto-added by Vercel Blob (Step 6) |

After deploy, visit the site + log in at `/admin/login`.

---

## 6. Customer 3D-model uploads ✅ code / 🧑 enable store
The upload code now uses **Vercel Blob** in production (falls back to local disk in dev).
🧑 In Vercel → **Storage → Create → Blob** → connect to the project. This injects
`BLOB_READ_WRITE_TOKEN` automatically. Redeploy.

---

## 7. Domain 🧑
Vercel → Settings → Domains → add your domain, follow the DNS steps. Then update
`NEXTAUTH_URL` and `PUBLIC_BASE_URL` to the real domain and redeploy.

---

## 8. Mollie 🧑
Keep the **test** key while testing. The app sends the webhook URL automatically
(from `PUBLIC_BASE_URL`). Do a test order (Step 10). Switch to the **live** key only
when everything works.

---

## 9. Sendcloud 🧑
Add public/secret keys, pick a shipping method → `SENDCLOUD_SHIPPING_METHOD_ID`,
fill the sender address vars. Labels auto-create on payment; you can also click
**Create label** in /admin.

---

## 10. Test before going live 🧑
On the live URL: add to cart → checkout → Mollie **test** "paid" → order shows
**paid** in /admin → label/tracking appears → try the quote form + model upload →
check EN/NL/FR and mobile.

---

## 11. Go live 🧑
Switch `MOLLIE_API_KEY` to the **live** key → redeploy → do one real purchase and
refund it to confirm the money + label flow. Done. 🎉

---

## Updating later
- Content/code: `git push` → auto-deploys.
- Products: edit in **/admin** (no deploy needed).
- Schema change: `npm run db:push` against Neon, then push code.
