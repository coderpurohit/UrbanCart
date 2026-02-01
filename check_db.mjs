
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://munvyoxsgifptbyiykjg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11bnZ5b3hzZ2lmcHRieWl5a2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwNzYzMTQsImV4cCI6MjA4NDY1MjMxNH0.37MsSP4XCcoo1pNLLQeYbYO2_lcq_eGPWVE3pHnoe0g';

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    const { data, error } = await supabase.from('products').select('name, image, category');
    if (error) {
        console.error(error);
        return;
    }
    console.log(`Total Products: ${data.length}`);

    // Check for duplicates
    const names = {};
    const images = {};

    data.forEach(p => {
        names[p.name] = (names[p.name] || 0) + 1;
        images[p.image] = (images[p.image] || 0) + 1;
    });

    console.log("\n--- Duplicate Names ---");
    for (const [name, count] of Object.entries(names)) {
        if (count > 1) console.log(`${name}: ${count}`);
    }

    console.log("\n--- Duplicate Images ---");
    for (const [img, count] of Object.entries(images)) {
        if (count > 1) console.log(`${img}: ${count}`);
    }

    console.log("\n--- All Products ---");
    data.forEach(p => console.log(`${p.category}: ${p.name} - ${p.image.substring(0, 30)}...`));
}

check();
