
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://munvyoxsgifptbyiykjg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11bnZ5b3hzZ2lmcHRieWl5a2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwNzYzMTQsImV4cCI6MjA4NDY1MjMxNH0.37MsSP4XCcoo1pNLLQeYbYO2_lcq_eGPWVE3pHnoe0g';

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    const names = ["Sprite Can", "Chocolate Cookies", "Corn Flakes", "Rolled Oats"];
    const { data, error } = await supabase
        .from('products')
        .select('name, image')
        .in('name', names);

    if (error) console.error(error);
    else console.log(data);
}

check();
