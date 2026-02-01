
const urls = [
    "https://commons.wikimedia.org/wiki/Special:FilePath/Cornflakes_in_bowl.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Rolled_oats.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Sprite_cans.jpg", // Might be "Sprite_cans.jpg" or "Sprite cans.jpg", URL encoding handles space
    "https://commons.wikimedia.org/wiki/Special:FilePath/Chocolate_chip_cookies.jpg"
];

async function check() {
    console.log("Testing FilePath redirects...");
    for (const u of urls) {
        try {
            // Using a browser-like UA just in case
            const res = await fetch(u, {
                method: 'HEAD',
                redirect: 'follow',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)'
                }
            });
            console.log(`${res.status} ${res.ok ? 'OK' : 'FAIL'} ${u} -> ${res.url}`);
        } catch (e) {
            console.log(`ERR ${u} : ${e.message}`);
        }
    }
}

check();
