
const urls = [
    "https://images.pexels.com/photos/9609848/pexels-photo-9609848.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/4552047/pexels-photo-4552047.jpeg?auto=compress&cs=tinysrgb&w=600", // Another Paneer candidate
    "https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=600"
];

async function check() {
    console.log("Testing Paneer candidates round 2...");
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
