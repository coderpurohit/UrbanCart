-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create products table
create table if not exists products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  price numeric not null,
  category text not null,
  image text not null,
  unit text not null,
  delivery_time text default '8 MINS',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for products but allow public read
alter table products enable row level security;
create policy "Public read products" on products for select using (true);

-- Create cart table
create table if not exists cart (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references products(id) not null,
  quantity integer default 1,
  user_id uuid, -- Nullable for guest/anonymous users
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for cart (allow all operations for demo purposes)
alter table cart enable row level security;
create policy "Public cart access" on cart for all using (true);

-- Create orders table
create table if not exists orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid,
  total_amount numeric not null,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for orders
alter table orders enable row level security;
create policy "Public orders access" on orders for all using (true);

-- Seed data for products
insert into products (name, price, category, image, unit, delivery_time) values
  ('Farm Fresh Milk', 27, 'Dairy', 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=500&q=80', '500 ml', '8 MINS'),
  ('Sweets', 80, 'Sweets', 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?auto=format&fit=crop&w=500&q=80', '250 g', '8 MINS'),
  ('Red Apple', 120, 'Fruits', 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=300&q=80', '1 kg', '8 MINS'),
  ('Whole Wheat Bread', 45, 'Bakery', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80', '400 g', '8 MINS'),
  ('Organic Eggs', 55, 'Dairy', 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=500&q=80', '6 pcs', '8 MINS'),
  ('Amul Butter', 58, 'Dairy', 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=500&q=80', '100 g', '8 MINS'),
  ('Lays Chips', 20, 'Snacks', 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&w=500&q=80', '50 g', '8 MINS'),
  ('Broccoli', 45, 'Vegetables', 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=300&q=80', '1 pc', '8 MINS'),
  ('Chicken Breast', 250, 'Meat', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=300&q=80', '500 g', '15 MINS'),
  ('Instant Coffee', 180, 'Coffee', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300&q=80', '100 g', '8 MINS'),
  -- Fitness products
  ('Protein Powder', 899, 'Fitness', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=500&q=80', '1 kg', '8 MINS'),
  ('Dumbbells Set', 1299, 'Fitness', 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=500&q=80', '5 kg', '8 MINS'),
  ('Yoga Mat', 599, 'Fitness', 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=500&q=80', '1 pc', '8 MINS'),
  ('Resistance Bands', 299, 'Fitness', 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=500&q=80', 'Set of 5', '8 MINS'),
  -- Fashion products
  ('Cotton T-Shirt', 499, 'Fashion', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80', '1 pc', '8 MINS'),
  ('Denim Jeans', 1299, 'Fashion', 'https://images.unsplash.com/photo-1542272604-787c3833835c?auto=format&fit=crop&w=500&q=80', '1 pc', '8 MINS'),
  ('Sneakers', 1999, 'Fashion', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80', '1 pair', '8 MINS'),
  ('Casual Shirt', 799, 'Fashion', 'https://images.unsplash.com/photo-1594938291221-94f313e0a43e?auto=format&fit=crop&w=500&q=80', '1 pc', '8 MINS'),
  -- Electronics products
  ('Wireless Earbuds', 1999, 'Electronics', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=500&q=80', '1 pc', '8 MINS'),
  ('Smart Watch', 4999, 'Electronics', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80', '1 pc', '8 MINS'),
  ('Power Bank', 899, 'Electronics', 'https://images.unsplash.com/photo-1609091834311-1ad7d1e69c88?auto=format&fit=crop&w=500&q=80', '10000 mAh', '8 MINS'),
  ('USB Cable', 199, 'Electronics', 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=500&q=80', '1 pc', '8 MINS'),
  -- Beauty products
  ('Face Moisturizer', 499, 'Beauty', 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=500&q=80', '50 ml', '8 MINS'),
  ('Lipstick', 299, 'Beauty', 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=500&q=80', '1 pc', '8 MINS'),
  ('Face Cleanser', 399, 'Beauty', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80', '100 ml', '8 MINS'),
  ('Sunscreen Lotion', 449, 'Beauty', 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=500&q=80', '50 ml', '8 MINS');

-- Remove any duplicate milk products (keep only the first one)
delete from products where name ilike '%milk%' and id not in (
  select id from products where name ilike '%milk%' order by created_at limit 1
);
