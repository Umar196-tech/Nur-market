# Nūr Market — bilingual digital marketplace

Next.js 14, TypeScript, Supabase and Paystack foundation.

This repository is the application source. It is not production-ready until Supabase credentials, database schema, storage, Paystack test keys, webhook configuration and end-to-end tests are completed.

## Setup
1. Create a Supabase project and run `supabase/schema.sql`.
2. Copy `.env.example` to `.env.local` and fill in the values.
3. Run `npm install` then `npm run dev`.
4. Create your account with Supabase Auth. Promote your own account to admin using the SQL in the setup notes.
5. Configure Paystack test keys and webhook before testing checkout.

Never commit `.env.local`, service-role keys, Paystack secrets, or passwords. Sell only files you own or are licensed to distribute.