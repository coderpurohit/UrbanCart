
import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';

const downloads = [
    { name: 'oreo.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Oreo-Two-Cookies.jpg' },
    { name: 'cookies.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg' },
    { name: 'cornflakes.jpg', url: 'https://images.pexels.com/photos/135525/pexels-photo-135525.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'oats.jpg', url: 'https://images.pexels.com/photos/11112773/pexels-photo-11112773.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'paneer.jpg', url: 'https://images.pexels.com/photos/9609848/pexels-photo-9609848.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'instant_coffee.jpg', url: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800' }, // Pexels Coffee
    { name: 'roasted_coffee.jpg', url: 'https://images.pexels.com/photos/373639/pexels-photo-373639.jpeg?auto=compress&cs=tinysrgb&w=800' }, // Pexels Coffee Beans
    { name: 'sprite.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Sprite_cans.jpg' },
    { name: 'grapes.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Green_grapes.jpg/500px-Green_grapes.jpg' }
];

async function downloadImages() {
    const outputDir = path.join(process.cwd(), 'public', 'products');

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    for (const item of downloads) {
        console.log(`Downloading ${item.name}...`);
        try {
            const res = await fetch(item.url);
            if (!res.ok) throw new Error(`Failed to fetch ${item.url}: ${res.statusText}`);

            const fileStream = fs.createWriteStream(path.join(outputDir, item.name));
            await new Promise((resolve, reject) => {
                res.body.pipe(fileStream);
                res.body.on("error", reject);
                fileStream.on("finish", resolve);
            });
            console.log(`✅ Saved ${item.name}`);
        } catch (e) {
            console.error(`❌ Error downloading ${item.name}:`, e.message);
        }
    }
}

downloadImages();
