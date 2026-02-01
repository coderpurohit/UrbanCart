import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  // Warn only in development, but don't crash to allow UI to render empty
  console.warn('Supabase URL or Key is missing. Please check your .env.local file.');
}

export const isSupabaseConfigured = !!supabaseUrl && !!supabaseKey && supabaseUrl !== 'your-project-url';

if (!isSupabaseConfigured) {
  console.log('Urban Cart: Supabase is not configured. Running in Demo Mode with mock data.');
}

export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl! : 'https://placeholder.supabase.co', 
  isSupabaseConfigured ? supabaseKey! : 'placeholder'
);

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  unit: string;
  delivery_time: string;
};

export type CartItem = {
  id: string;
  product_id: string;
  quantity: number;
  user_id: string | null;
  products?: Product; // Joined table data comes as 'products' (plural) by default
};

export type UserProfile = {
  id: string;
  name: string;
  phone: string;
  address_label: string;
  address_line: string;
};

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  created_at: string;
  read: boolean;
  user_id: string;
};
