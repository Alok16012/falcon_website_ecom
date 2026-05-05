-- Run this once in Supabase SQL Editor

create table if not exists products (
  id text primary key,
  slug text,
  category text,
  data jsonb not null
);

alter table products enable row level security;

drop policy if exists "public read products" on products;
create policy "public read products" on products for select using (true);
drop policy if exists "service write products" on products;
create policy "service write products" on products for all using (auth.role() = 'service_role');

create table if not exists banners (
  id integer primary key default 1,
  data jsonb not null
);

alter table banners enable row level security;

drop policy if exists "public read banners" on banners;
create policy "public read banners" on banners for select using (true);
drop policy if exists "service write banners" on banners;
create policy "service write banners" on banners for all using (auth.role() = 'service_role');
