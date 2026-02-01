
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://munvyoxsgifptbyiykjg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11bnZ5b3hzZ2lmcHRieWl5a2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwNzYzMTQsImV4cCI6MjA4NDY1MjMxNH0.37MsSP4XCcoo1pNLLQeYbYO2_lcq_eGPWVE3pHnoe0g';

const supabase = createClient(supabaseUrl, supabaseKey);

const updates = {
    "Rolled Oats": "https://images.pexels.com/photos/11112773/pexels-photo-11112773.jpeg?auto=compress&cs=tinysrgb&w=600",
    "Corn Flakes": "https://images.pexels.com/photos/135525/pexels-photo-135525.jpeg?auto=compress&cs=tinysrgb&w=600", // Using pasta/cereal generic or the one verified
    "Chocolate Cookies": "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=600"
};

async function updateImages() {
    console.log("Applying FINAL REAL IMAGES fix...");

    for (const [name, url] of Object.entries(updates)) {
        const { error } = await supabase
            .from('products')
            .update({ image: url })
            .eq('name', name);

        if (error) {
            console.error(`❌ Update Failed for ${name}: ${error.message}`);
        } else {
            console.log(`✅ Updated ${name} -> ${url}`);
        }
    }
}

updateImages();
