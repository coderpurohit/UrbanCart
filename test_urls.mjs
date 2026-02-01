
const urls = [
    "https://images.unsplash.com/photo-v69Y6-f2v3w?auto=format&fit=crop&w=500&q=80",
    "https://source.unsplash.com/v69Y6-f2v3w/500x500",
    "https://images.unsplash.com/photo-h8_24vj8nFk?auto=format&fit=crop&w=500&q=80",
    "https://source.unsplash.com/h8_24vj8nFk/500x500",
    "https://images.unsplash.com/photo-e-w9X6vW6l8?auto=format&fit=crop&w=500&q=80",
    "https://source.unsplash.com/e-w9X6vW6l8/500x500"
];

async function check() {
    for (const u of urls) {
        try {
            const res = await fetch(u, { method: 'HEAD', redirect: 'follow' });
            console.log(`${res.status} ${res.ok ? 'OK' : 'FAIL'} ${u} -> ${res.url}`);
        } catch (e) {
            console.log(`ERR ${u} : ${e.message}`);
        }
    }
}

check();
