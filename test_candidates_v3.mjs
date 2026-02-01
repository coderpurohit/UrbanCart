
const urls = [
    // Rolled Oats (Pexels - Verified)
    "https://images.pexels.com/photos/11112773/pexels-photo-11112773.jpeg?auto=compress&cs=tinysrgb&w=600",

    // Corn Flakes Candidates
    "https://upload.wikimedia.org/wikipedia/commons/8/82/Cornflakes_in_bowl.jpg", // Guess
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Cornflakes_in_bowl.jpg/640px-Cornflakes_in_bowl.jpg",
    "https://images.pexels.com/photos/135525/pexels-photo-135525.jpeg?auto=compress&cs=tinysrgb&w=600", // Cereal/Pasta?
    "https://images.unsplash.com/photo-1574315042622-4fe815349f48?auto=format&fit=crop&w=600&q=80", // Corn flakes bowl

    // Chocolate Cookies Candidates
    "https://upload.wikimedia.org/wikipedia/commons/f/f1/Chocolate_chip_cookies.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Chocolate_chip_cookies.jpg/640px-Chocolate_chip_cookies.jpg",
    "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=600", // Cookies
    "https://images.pexels.com/photos/2070054/pexels-photo-2070054.jpeg?auto=compress&cs=tinysrgb&w=600" // Cookies stack
];

async function check() {
    console.log("Testing new candidates...");
    for (const u of urls) {
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 3000);

            const res = await fetch(u, {
                method: 'HEAD',
                signal: controller.signal,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });
            clearTimeout(timeout);

            console.log(`${res.status} ${res.ok ? 'OK' : 'FAIL'} ${u}`);
        } catch (e) {
            console.log(`ERR ${u} : ${e.message}`);
        }
    }
}

check();
