import { neon } from '@neondatabase/serverless';
import fs from 'fs';

// Manually parse .env.local if exists
let databaseUrl = 'postgresql://neondb_owner:npg_edSJUKf0QI1W@ep-flat-feather-adtgrkk0-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

if (fs.existsSync('.env.local')) {
  const envContent = fs.readFileSync('.env.local', 'utf-8');
  const dbUrlMatch = envContent.match(/DATABASE_URL\s*=\s*['"]?([^'"\r\n]+)['"]?/);
  if (dbUrlMatch) {
    databaseUrl = dbUrlMatch[1];
    console.log("Loaded DATABASE_URL from .env.local");
  }
}

console.log("Connecting to Neon DB:", databaseUrl.split('@')[1] || databaseUrl);

const sql = neon(databaseUrl);

const schema = `
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  name TEXT,
  phone TEXT,
  address_label TEXT,
  address_line TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  unit TEXT NOT NULL,
  delivery_time TEXT DEFAULT '8 MINS',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS cart (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER DEFAULT 1,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  total_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  full_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);
`;

const products = [
    { name: 'Whole Wheat Bread', price: 45, category: 'Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80', unit: '400 g', delivery_time: '8 MINS' },
    { name: 'White Sandwich Bread', price: 35, category: 'Bakery', image: 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?auto=format&fit=crop&w=500&q=80', unit: '400 g', delivery_time: '8 MINS' },
    { name: 'Garlic Bread', price: 85, category: 'Bakery', image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?auto=format&fit=crop&w=500&q=80', unit: '250 g', delivery_time: '15 MINS' },
    { name: 'Baker Croissant', price: 30, category: 'Bakery', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80', unit: '6 pcs', delivery_time: '8 MINS' },
    { name: 'Coca Cola', price: 40, category: 'Beverages', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=80', unit: '750 ml', delivery_time: '8 MINS' },
    { name: 'Orange Juice', price: 120, category: 'Beverages', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=500&q=80', unit: '1 L', delivery_time: '8 MINS' },
    { name: 'Sprite Can', price: 35, category: 'Beverages', image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?auto=format&fit=crop&w=500&q=80', unit: '300 ml', delivery_time: '8 MINS' },
    { name: 'Oreo Cookies', price: 30, category: 'Biscuits', image: '/products/oreo.jpg', unit: '120 g', delivery_time: '8 MINS' },
    { name: 'Chocolate Cookies', price: 45, category: 'Biscuits', image: '/products/cookies.jpg', unit: '250 g', delivery_time: '8 MINS' },
    { name: 'Corn Flakes', price: 140, category: 'Breakfast', image: '/products/cornflakes.jpg', unit: '475 g', delivery_time: '8 MINS' },
    { name: 'Rolled Oats', price: 95, category: 'Breakfast', image: '/products/oats.jpg', unit: '1 kg', delivery_time: '8 MINS' },
    { name: 'Instant Coffee', price: 180, category: 'Coffee', image: '/products/instant_coffee.jpg', unit: '100 g', delivery_time: '8 MINS' },
    { name: 'Roasted Coffee Beans', price: 350, category: 'Coffee', image: '/products/roasted_coffee.jpg', unit: '500 g', delivery_time: '8 MINS' },
    { name: 'Healthy Salad Bowl', price: 150, category: 'Food', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80', unit: '1 serving', delivery_time: '30 MINS' },
    { name: 'Veg Biryani', price: 220, category: 'Food', image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=500&q=80', unit: '1 serving', delivery_time: '45 MINS' },
    { name: 'Ice Cream Scoops', price: 250, category: 'Frozen', image: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=500&q=80', unit: '500 ml', delivery_time: '15 MINS' },
    { name: 'Frozen Peas', price: 80, category: 'Frozen', image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&w=500&q=80', unit: '500 g', delivery_time: '20 MINS' },
    { name: 'Farm Fresh Milk', price: 27, category: 'Dairy', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=500&q=80', unit: '500 ml', delivery_time: '8 MINS' },
    { name: 'Fresh Paneer', price: 95, category: 'Dairy', image: '/products/paneer.jpg', unit: '200 g', delivery_time: '8 MINS' },
    { name: 'Salted Butter', price: 58, category: 'Dairy', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=500&q=80', unit: '100 g', delivery_time: '8 MINS' },
    { name: 'Fresh Mangoes', price: 120, category: 'Fruits', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=500&q=80', unit: '1 dozen', delivery_time: '8 MINS' },
    { name: 'Robusta Banana', price: 60, category: 'Fruits', image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=500&q=80', unit: '1 dozen', delivery_time: '8 MINS' },
    { name: 'Red Apples', price: 140, category: 'Fruits', image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&w=500&q=80', unit: '1 kg', delivery_time: '8 MINS' },
    { name: 'Green Grapes', price: 90, category: 'Fruits', image: 'https://images.unsplash.com/photo-1596363505729-41905a9a63d6?auto=format&fit=crop&w=500&q=80', unit: '500 g', delivery_time: '8 MINS' },
    { name: 'Instant Noodles', price: 14, category: 'Instant', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=500&q=80', unit: '70 g', delivery_time: '8 MINS' },
    { name: 'Cup Noodles', price: 50, category: 'Instant', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=500&q=80', unit: '1 cup', delivery_time: '8 MINS' }
];

async function setup() {
  console.log("Setting up Neon DB database schema...");
  const statements = schema.split(';').map(s => s.trim()).filter(s => s.length > 0);
  for (const statement of statements) {
    try {
      await sql.query(statement);
    } catch (err) {
      console.error("Error executing statement:", statement, err.message);
    }
  }
  console.log("Database schema created.");

  console.log("Checking if products already exist...");
  const countRes = await sql.query("SELECT COUNT(*) FROM products");
  const count = parseInt(countRes[0].count, 10);
  console.log(`Current product count: ${count}`);

  if (count === 0) {
    console.log("Seeding products...");
    for (const p of products) {
      await sql.query(
        "INSERT INTO products (name, price, category, image, unit, delivery_time) VALUES ($1, $2, $3, $4, $5, $6)",
        [p.name, p.price, p.category, p.image, p.unit, p.delivery_time]
      );
    }
    console.log("Products seeded!");
  } else {
    console.log("Products table already seeded.");
  }
  console.log("Setup complete!");
}

setup().catch(err => {
  console.error("Fatal setup error:", err);
});
