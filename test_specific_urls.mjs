
import fetch from 'node-fetch';

const candidates = {
    oreo: [
        'https://images.unsplash.com/photo-1569091721849-7d4d8e330945?auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1532499630277-9f6b9802298a?auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=500&q=80'
    ],
    chocolate_cookies: [
        'https://images.unsplash.com/photo-1499636138143-bd630f5cf386?auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1618411640018-93d40a3791a3?auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1621236378699-8597f5106d27?auto=format&fit=crop&w=500&q=80'
    ],
    corn_flakes: [
        'https://images.unsplash.com/photo-1563865436874-bf57613ec2be?auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1627308595261-2f778393e9ad?auto=format&fit=crop&w=500&q=80', // cereal
        'https://images.unsplash.com/photo-1588612501258-1f2e18b871c1?auto=format&fit=crop&w=500&q=80' // cereal bowl
    ],
    oats: [
        'https://images.unsplash.com/photo-1517441221711-4777d077dff4?auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1646635295240-5a3962b08332?auto=format&fit=crop&w=500&q=80', // oats jar
        'https://images.unsplash.com/photo-1615486877477-97217db67464?auto=format&fit=crop&w=500&q=80' // rolled oats
    ],
    paneer: [
        'https://images.unsplash.com/photo-1559561853-2c1b92F473e?auto=format&fit=crop&w=500&q=80', // Previous candidate
        'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=500&q=80', // paneer dishes
        'https://plus.unsplash.com/premium_photo-1672323861803-34e85741f237?auto=format&fit=crop&w=500&q=80' // cottage cheese
    ]
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
