# Deployment Guide

This project is a full-stack Next.js app with Prisma, Mollie payments, Sendcloud shipping, and admin pages. The recommended setup is Vercel for hosting plus a hosted Postgres database.

## 1. Create A Postgres Database

Use one of these:

- Neon
- Supabase
- Prisma Postgres
- Vercel Storage Postgres

Copy the production connection string. It should look like:

```env
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
DATABASE_URL_UNPOOLED="postgresql://user:password@host:5432/database?sslmode=require"
```

For Neon, use the pooled URL for `DATABASE_URL` and the non-pooled URL for `DATABASE_URL_UNPOOLED`.

## 2. Set Environment Variables

In Vercel, open the project settings and add these environment variables:

```env
DATABASE_URL="postgresql://..."
DATABASE_URL_UNPOOLED="postgresql://..."
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="generate-a-long-random-secret"
PUBLIC_BASE_URL="https://yourdomain.com"

ADMIN_EMAIL="your-admin@email.com"
ADMIN_PASSWORD="choose-a-strong-password"

MOLLIE_API_KEY="test_xxx_or_live_xxx"

SENDCLOUD_PUBLIC_KEY="..."
SENDCLOUD_SECRET_KEY="..."
SENDCLOUD_SHIPPING_METHOD_ID="..."
SENDCLOUD_FROM_NAME="Your Studio"
SENDCLOUD_FROM_COMPANY="Your Studio"
SENDCLOUD_FROM_ADDRESS="Street name"
SENDCLOUD_FROM_HOUSE_NUMBER="1"
SENDCLOUD_FROM_CITY="City"
SENDCLOUD_FROM_POSTAL_CODE="1000"
SENDCLOUD_FROM_COUNTRY="BE"
```

For `NEXTAUTH_SECRET`, generate a random value:

```bash
openssl rand -base64 32
```

## 3. Switch The Datasource To Postgres

The repo ships configured for **SQLite** so it runs locally with no external
database. Before deploying, edit `prisma/schema.prisma` and change the
`datasource` block to Postgres:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DATABASE_URL_UNPOOLED")
}
```

(To keep developing locally on SQLite afterwards, just don't commit that
change — or use a separate Neon dev database so local matches production.)

## 4. Push The Database Schema

After setting `DATABASE_URL` and `DATABASE_URL_UNPOOLED`, run this locally or from a deployment shell:

```bash
npm install
npm run db:push
npm run db:seed
```

Use `db:push` for the first simple launch. Later, when schema changes become more formal, use migrations.

## 5. Deploy To Vercel

Push the project to GitHub, then:

1. Go to Vercel.
2. Click **Add New Project**.
3. Import the GitHub repo.
4. Keep framework as **Next.js**.
5. Build command: `npm run build`
6. Install command: `npm install`
7. Add the environment variables from step 2.
8. Deploy.

The build script runs `prisma generate && next build`.

## 6. Configure Mollie

In Mollie:

1. Start with a test API key.
2. Set the webhook URL to:

```txt
https://yourdomain.com/api/webhooks/mollie
```

3. Place a test order.
4. Confirm the order updates in the admin dashboard.
5. Switch to the live key only when the full flow works.

## 7. Configure Sendcloud

In Sendcloud:

1. Create an API integration.
2. Copy the public and secret keys into Vercel.
3. Choose a shipping method and set `SENDCLOUD_SHIPPING_METHOD_ID`.
4. Fill all sender address variables.
5. Place a paid test order and confirm a parcel is created.

## 8. Add A Domain

In Vercel:

1. Go to **Settings > Domains**.
2. Add your domain.
3. Follow Vercel's DNS instructions.
4. Update:

```env
NEXTAUTH_URL="https://yourdomain.com"
PUBLIC_BASE_URL="https://yourdomain.com"
```

Then redeploy.

## Notes

- The repo defaults to SQLite so it runs locally out of the box. SQLite is **not** suitable for hosted ecommerce orders — switch the datasource to Postgres before deploying (see step 3).
- Customer 3D-model uploads use **Vercel Blob** in production. In the Vercel dashboard go to **Storage → Create → Blob**, connect it to the project, and `BLOB_READ_WRITE_TOKEN` is injected automatically. Without it, uploads fall back to local disk (fine for dev, not for Vercel).
- Test with Mollie test keys before using live keys.
- Keep all Mollie and Sendcloud secrets in hosting environment variables, never in frontend code.
