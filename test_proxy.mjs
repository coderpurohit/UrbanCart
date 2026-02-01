
const urls = [
    "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/e/e0/GreenGrapes.jpg&w=600",
    "https://images.weserv.nl/?url=ssl:upload.wikimedia.org/wikipedia/commons/e/e0/GreenGrapes.jpg&w=600"
];

async function check() {
    for (const u of urls) {
        try {
            const res = await fetch(u, { method: 'HEAD' });
            console.log(`${res.status} ${res.ok ? 'OK' : 'FAIL'} ${u}`);
        } catch (e) {
            console.log(`ERR ${u} : ${e.message}`);
        }
    }
}

check();
