
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://munvyoxsgifptbyiykjg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11bnZ5b3hzZ2lmcHRieWl5a2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwNzYzMTQsImV4cCI6MjA4NDY1MjMxNH0.37MsSP4XCcoo1pNLLQeYbYO2_lcq_eGPWVE3pHnoe0g';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verify() {
    const { data: products, error } = await supabase.from('products').select('name, image');
    if (error) {
        console.error("DB Error:", error);
        return;
    }

    console.log(`Verifying ${products.length} images...`);

    let brokenCount = 0;

    for (const p of products) {
        try {
            const res = await fetch(p.image, { method: 'HEAD' });
            if (!res.ok) {
                console.log(`❌ BROKEN [${res.status}]: ${p.name} -> ${p.image}`);
                brokenCount++;
            } else {
                // console.log(`✅ OK: ${p.name}`);
            }
        } catch (e) {
            console.log(`❌ ERROR: ${p.name} -> ${e.message}`);
            brokenCount++;
        }
    }

    console.log(`\nVerification Complete. ${brokenCount} broken images found.`);
}

verify();
