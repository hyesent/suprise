# Martin Mouritzen — Birthday Experience

Cinematic React + Vite birthday experience based on the supplied source.

## Run locally

1. Install Node.js 18+.
2. Run `npm install`.
3. Copy `.env.local.example` to `.env.local`.
4. Add your Supabase project URL and anon key.
5. Run `npm run dev`.

## Supabase

Run `supabase/schema.sql` in the Supabase SQL editor. It creates the wishes table, RLS policies, and the `wish-photos` storage bucket.

## Assets

Replace `public/photos/01.jpg` through `07.jpg` with the real photos. Add `public/sounds/ambient.mp3` and `public/sounds/transition.mp3`.

## Build

`npm run build`
