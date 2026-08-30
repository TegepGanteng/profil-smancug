document.addEventListener('DOMContentLoaded', () => {
    
    // 1. AOS ANIMATION
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true, easing: 'ease-in-out' });
    }

    // 2. TILT 3D EFEK
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
            max: 12, speed: 400, glare: true, "max-glare": 0.15
        });
    }

    // 3. BACKGROUND SLIDER BERANDA
    const slides = document.querySelectorAll('.hero-slider .slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); // Berganti setiap 5 detik
    }

    // 4. TYPEWRITER EFEK
    const textElement = document.getElementById('typewriter');
    if (textElement) {
        const textToType = "SMAN 10 DEPOK";
        let index = 0;
        function typeWriter() {
            if (index < textToType.length) {
                textElement.innerHTML += textToType.charAt(index);
                index++;
                setTimeout(typeWriter, 120);
            }
        }
        typeWriter();
    }

    // 5. HAMBURGER MENU MOBILE
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => { navLinks.classList.toggle('active'); });
    }

    // 6. ANIMATED COUNTER
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    const startCounting = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    let observerTriggered = false;
    const statsSection = document.querySelector('#statistik');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !observerTriggered) {
                startCounting();
                observerTriggered = true;
            }
        }, { threshold: 0.3 });
        observer.observe(statsSection);
    }

    // 7. INTEGRASI DISCORD WEBHOOK REAL-TIME
    const santoenForm = document.getElementById('santoenForm');
    const successMsg = document.getElementById('formSuccess');
    const btnSubmit = document.getElementById('btnSubmit');

    if (santoenForm) {
        santoenForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nama = document.getElementById('nama').value;
            const status = document.getElementById('status').value;
            const discordUser = document.getElementById('username_discord').value;
            const pesan = document.getElementById('pesan').value;

            const webhookURL = "https://discord.com/api/webhooks/1543341313385299979/u9N1cFiQ3Bra8p8gHWUxsMUgjup5C8xcb7TmXKGORl82G-gCf_Ed6XjHcFbt3p76QhI7";

            btnSubmit.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Mengirim ke Discord...`;
            btnSubmit.disabled = true;

            const payload = {
                username: "Website SMAN 10 Bot",
                avatar_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=100",
                embeds: [
                    {
                        title: "📥 Pesan Baru dari Form Website SMAN 10 Depok",
                        color: 13938487, // Emas (#D4AF37)
                        fields: [
                            { name: "Nama Lengkap", value: nama, inline: true },
                            { name: "Status / Role", value: status, inline: true },
                            { name: "Discord / Email", value: discordUser, inline: false },
                            { name: "Isi Pesan", value: pesan, inline: false }
                        ],
                        footer: { text: "Disampaikan via Website SMAN 10 Depok System" },
                        timestamp: new Date().toISOString()
                    }
                ]
            };

            fetch(webhookURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (response.ok) {
                    successMsg.style.color = "#16a34a";
                    successMsg.innerHTML = `<i class="fas fa-check-circle"></i> Berhasil! Pesan kamu telah dikirim langsung ke Server Discord SMAN 10 Depok.`;
                    santoenForm.reset();
                } else {
                    throw new Error('Gagal mengirim Webhook');
                }
            })
            .catch(error => {
                console.error(error);
                successMsg.style.color = "#dc2626";
                successMsg.innerHTML = `<i class="fas fa-exclamation-circle"></i> Terjadi kesalahan saat mengirim pesan ke Discord.`;
            })
            .finally(() => {
                btnSubmit.innerHTML = `<i class="fas fa-paper-plane"></i> Kirim Langsung ke Discord`;
                btnSubmit.disabled = false;
            });
        });
    }
});
