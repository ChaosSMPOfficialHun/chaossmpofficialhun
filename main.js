const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible'); else e.target.classList.remove('visible');
    });
}, { threshold: 0.15 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

document.addEventListener('scroll',() => {
    document.getElementsByClassName('scroll-hint')[0].style.display = 'none';
});

// Countdown to June 26, 2026
const target = new Date('2026-06-26T00:00:00');
function updateCountdown() {
    const now = new Date();
    const diff = target - now;
    if (diff <= 0) return;
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    const mins = Math.floor((diff % (1000*60*60)) / (1000*60));
    const secs = Math.floor((diff % (1000*60)) / 1000);
    document.getElementById('cd-days').textContent = String(days).padStart(2,'0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2,'0');
    document.getElementById('cd-mins').textContent = String(mins).padStart(2,'0');
    document.getElementById('cd-secs').textContent = String(secs).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Form submission
async function submitForm(event) {
    event.preventDefault();
    const username = document.getElementById('mc-name').value.trim();
    const discord = document.getElementById('discord-tag').value.trim();
    const age = document.getElementById('kor').value.trim();
    const reason = document.getElementById('indok').value.trim();
    const source = document.getElementById('forras').value;

    const btn = document.getElementById('submit-btn');
    btn.textContent = '⏳ Küldés...';
    btn.disabled = true;

    const inviteLink = 'https://discord.gg/EJnNTtAP72';

    // Szöveg összeállítása másoláshoz
    const szoveg = `**⚡ Új Jelentkezés — Chaos SMP**\n🎮 Minecraft név: ${username}\n💬 Discord: ${discord}\n🎂 Kor: ${age}\n📝 Miért akar csatlakozni: ${reason}\n📢 Honnan hallott rólunk: ${source}`;

    try {
        // Sikeres másolás — megmutatjuk a popup-ot
        await fetch(`https://discord.com/api/webhooks/1492134642499977237/tW8qjsKRpWIqIjaMixJGL03FYvn4WW5n_3UAC2jGs86H_Bq4n6GOTejVKPjBS8mT20N-`, {
            body: JSON.stringify({
                content: szoveg,
                thread_name: `${String(discord).at(0).toUpperCase() + String(discord).substring(1)} Jelentjezése`
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        }).catch(err => {
            console.log(err);
        });
        document.getElementById('success-popup').style.display = 'flex';
        document.getElementById('jelentkezes-form').reset();
    } catch(e) {
        // Ha a webhook nem elérhető, csak megmutatjuk a popupot
        document.getElementById('success-popup').style.display = 'flex';
    }

    btn.textContent = '⚡ Jelentkezés Küldése';
    btn.disabled = false;
}

// Lore tab filter
function switchLore(type) {
    document.querySelectorAll('.lore-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    document.querySelectorAll('.lore-card').forEach(c => {
        if (type === 'all' || c.dataset.type === type) {
        c.classList.remove('hidden');
        } else {
        c.classList.add('hidden');
        }
    });
}
const iframe = document.getElementById('map-canvas');
const fallback = document.getElementById('fallback');

const timeout = setTimeout(() => {
    iframe.style.display = 'none';
    fallback.style.display = 'block';
}, 2000);

iframe.onload = () => {
    clearTimeout(timeout);
};