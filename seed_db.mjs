
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://munvyoxsgifptbyiykjg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11bnZ5b3hzZ2lmcHRieWl5a2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwNzYzMTQsImV4cCI6MjA4NDY1MjMxNH0.37MsSP4XCcoo1pNLLQeYbYO2_lcq_eGPWVE3pHnoe0g';

const supabase = createClient(supabaseUrl, supabaseKey);

const products = [
    // BAKERY
    { name: 'Whole Wheat Bread', price: 45, category: 'Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80', unit: '400 g', delivery_time: '8 MINS' },
    { name: 'White Sandwich Bread', price: 35, category: 'Bakery', image: 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?auto=format&fit=crop&w=500&q=80', unit: '400 g', delivery_time: '8 MINS' },
    { name: 'Garlic Bread', price: 85, category: 'Bakery', image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?auto=format&fit=crop&w=500&q=80', unit: '250 g', delivery_time: '15 MINS' },
    { name: 'Baker Croissant', price: 30, category: 'Bakery', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80', unit: '6 pcs', delivery_time: '8 MINS' },

    // BEVERAGES
    { name: 'Coca Cola', price: 40, category: 'Beverages', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=80', unit: '750 ml', delivery_time: '8 MINS' },
    { name: 'Orange Juice', price: 120, category: 'Beverages', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=500&q=80', unit: '1 L', delivery_time: '8 MINS' },
    { name: 'Sprite Can', price: 35, category: 'Beverages', image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?auto=format&fit=crop&w=500&q=80', unit: '300 ml', delivery_time: '8 MINS' },

    // BISCUITS
    { name: 'Oreo Cookies', price: 30, category: 'Biscuits', image: '/products/oreo.jpg', unit: '120 g', delivery_time: '8 MINS' }, // Local Oreo
    { name: 'Chocolate Cookies', price: 45, category: 'Biscuits', image: '/products/cookies.jpg', unit: '250 g', delivery_time: '8 MINS' }, // Local Cookies

    // BREAKFAST
    { name: 'Corn Flakes', price: 140, category: 'Breakfast', image: '/products/cornflakes.jpg', unit: '475 g', delivery_time: '8 MINS' }, // Local Corn Flakes
    { name: 'Rolled Oats', price: 95, category: 'Breakfast', image: '/products/oats.jpg', unit: '1 kg', delivery_time: '8 MINS' }, // Local Oats

    // COFFEE
    { name: 'Instant Coffee', price: 180, category: 'Coffee', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300&q=80', unit: '100 g', delivery_time: '8 MINS' },
    { name: 'Roasted Coffee Beans', price: 350, category: 'Coffee', image: 'https://images.unsplash.com/photo-1596704149909-6447c2a71f76?auto=format&fit=crop&w=500&q=80', unit: '500 g', delivery_time: '8 MINS' },

    // FOOD
    { name: 'Healthy Salad Bowl', price: 150, category: 'Food', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80', unit: '1 serving', delivery_time: '30 MINS' },
    { name: 'Veg Biryani', price: 220, category: 'Food', image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=500&q=80', unit: '1 serving', delivery_time: '45 MINS' },

    // FROZEN
    { name: 'Ice Cream Scoops', price: 250, category: 'Frozen', image: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=500&q=80', unit: '500 ml', delivery_time: '15 MINS' },
    { name: 'Frozen Peas', price: 80, category: 'Frozen', image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&w=500&q=80', unit: '500 g', delivery_time: '20 MINS' },

    // DAIRY
    { name: 'Farm Fresh Milk', price: 27, category: 'Dairy', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=500&q=80', unit: '500 ml', delivery_time: '8 MINS' },
    { name: 'Fresh Paneer', price: 95, category: 'Dairy', image: '/products/paneer.jpg', unit: '200 g', delivery_time: '8 MINS' }, // Local Paneer
    { name: 'Salted Butter', price: 58, category: 'Dairy', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=500&q=80', unit: '100 g', delivery_time: '8 MINS' },
    { name: 'Salted Butter', price: 58, category: 'Dairy', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=500&q=80', unit: '100 g', delivery_time: '8 MINS' },

    // FRUITS
    { name: 'Fresh Mangoes', price: 120, category: 'Fruits', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=500&q=80', unit: '1 dozen', delivery_time: '8 MINS' },
    { name: 'Robusta Banana', price: 60, category: 'Fruits', image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=500&q=80', unit: '1 dozen', delivery_time: '8 MINS' },
    { name: 'Red Apples', price: 140, category: 'Fruits', image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&w=500&q=80', unit: '1 kg', delivery_time: '8 MINS' },
    { name: 'Green Grapes', price: 90, category: 'Fruits', image: 'https://images.unsplash.com/photo-1596363505729-41905a9a63d6?auto=format&fit=crop&w=500&q=80', unit: '500 g', delivery_time: '8 MINS' }, // Verified

    // INSTANT
    { name: 'Instant Noodles', price: 14, category: 'Instant', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=500&q=80', unit: '70 g', delivery_time: '8 MINS' },
    { name: 'Cup Noodles', price: 50, category: 'Instant', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=500&q=80', unit: '1 cup', delivery_time: '8 MINS' }
];

async function seed() {
    console.log('Clearing existing data...');

    // 1. Clear Cart first (Foreign Key Constraint)
    const { error: cartError } = await supabase.from('cart').delete().gt('id', '00000000-0000-0000-0000-000000000000');
    if (cartError) {
        // Warning only, as cart might be empty or policy might block
        console.warn('Warning clearing cart:', cartError.message);
    } else {
        console.log('Cart cleared.');
    }

    // 2. Clear Products (Try deleting all where price > -1)
    const { error: deleteError } = await supabase.from('products').delete().gt('price', -1);

    if (deleteError) {
        console.error('Error clearing products:', deleteError);
        return;
    }

    // Verify deletion
    const { count, error: countError } = await supabase.from('products').select('*', { count: 'exact', head: true });

    if (countError) {
        console.error('Error verifying deletion:', countError);
    } else {
        console.log(`Products remaining after clearing: ${count}`);
    }

    console.log('Inserting new products...');
    const { data, error } = await supabase.from('products').insert(products).select();

    if (error) {
        console.error('Error seeding products:', error);
    } else {
        console.log(`Successfully inserted ${data.length} products!`);
    }
}

seed();
