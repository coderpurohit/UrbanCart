-- Script to fix duplicate milk products and replace banana with sweets in existing database
-- Run this in your Supabase SQL editor if you have an existing database

-- Remove duplicate milk products (keep only the first one by created_at)
delete from products where name ilike '%milk%' and id not in (
  select id from products where name ilike '%milk%' order by created_at limit 1
);

-- Remove banana product if it exists
delete from products where name = 'Banana';

-- Add sweets product if it doesn't exist
insert into products (name, price, category, image, unit, delivery_time)
select 'Sweets', 80, 'Sweets', 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?auto=format&fit=crop&w=500&q=80', '250 g', '8 MINS'
where not exists (select 1 from products where name = 'Sweets');

-- Verify the changes (optional - remove this line if you don't want to see results)
select * from products order by 
  case when name ilike '%milk%' then 1
       when name ilike '%sweets%' then 2
       when name ilike '%apple%' then 3
       else 4 end,
  created_at;