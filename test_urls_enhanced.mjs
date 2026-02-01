
import fetch from 'node-fetch';

const candidates = {
    // DAIRY
    paneer: [
        'https://images.unsplash.com/photo-1559561853-2c1b92F473e?auto=format&fit=crop&w=500&q=80', // Cottage cheese?
        'https://images.unsplash.com/photo-1628191013093-e570dfd46816?auto=format&fit=crop&w=500&q=80', // Paneer dishes
        'https://plus.unsplash.com/premium_photo-1672323861803-34e85741f237?auto=format&fit=crop&w=500&q=80'
    ],
    milk: [
        'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=500&q=80', // Existing
        'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=500&q=80'
    ],
    butter: [
        'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=500&q=80', // Existing
        'https://images.unsplash.com/photo-1594498653385-d51755755d20?auto=format&fit=crop&w=500&q=80'
    ]
    // Add others if needed
};

async function test() {
    for (const [key, urls] of Object.entries(candidates)) {
        console.log(`\nTesting ${key}...`);
        for (const url of urls) {
            try {
                const res = await fetch(url, { method: 'HEAD' });
                if (res.ok) {
                    console.log(`✅ ${res.status}: ${url}`);
                } else {
                    console.log(`❌ ${res.status}: ${url}`);
                }
            } catch (e) {
                console.log(`❌ Error: ${e.message}`);
            }
        }
    }
}

test();
