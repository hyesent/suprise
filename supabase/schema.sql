-- Supabase schema (run in SQL editor)
create table if not exists wishes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  photo_url text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz default now()
);

alter table wishes enable row level security;

-- Public can insert (pending only)
create policy "public_insert_wishes"
  on wishes for insert
  to anon
  with check (status = 'pending');

-- Public can read approved
create policy "public_read_approved"
  on wishes for select
  to anon
  using (status = 'approved');

-- Only service role can update/delete (for admin moderation)
-- (No policies for update/delete => only service role can do it)

-- Storage bucket
insert into storage.buckets (id, name, public)
values ('wish-photos', 'wish-photos', true)
on conflict (id) do nothing;

create policy "public_upload_wish_photos"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'wish-photos');

create policy "public_read_wish_photos"
  on storage.objects for select
  to anon
  using (bucket_id = 'wish-photos');
