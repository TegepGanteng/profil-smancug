document.addEventListener('DOMContentLoaded', () => {

    // 1. INISIALISASI AOS (ANIMATE ON SCROLL)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }

    // 2. HERO SLIDER AUTOMATIC (JIKA ADA DI HALAMAN BERANDA)
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }

    // 3. RESPONSIVE NAVIGATION (NAVBAR MOBILE TOGGLE)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    // 4. TYPEWRITER EFEK (DIBERSIHKAN AGAR TIDAK DOUBLE)
    const textElement = document.getElementById('typewriter');
    if (textElement) {
        textElement.innerHTML = ""; 
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

    // 5. ANIMATED COUNTER (STATISTIK)
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;

    const startCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const speed = target / 50; 

            const updateCount = () => {
                count += speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    const statsSection = document.getElementById('statistik');
    if (statsSection && counters.length > 0) {
        window.addEventListener('scroll', () => {
            const sectionPos = statsSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.3;

            if (sectionPos < screenPos && !hasAnimated) {
                startCounters();
                hasAnimated = true;
            }
        });
    }

    // 6. VANILLA TILT (EFEK 3D CARD)
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
    }

    // 7. DISCORD WEBHOOK FORM INTEGRATION (KOMUNITAS SANTOEN)
    const santoenForm = document.getElementById('santoenForm');
    const formSuccess = document.getElementById('formSuccess');
    const btnSubmit = document.getElementById('btnSubmit');

    if (santoenForm) {
        santoenForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Kunci tombol agar tidak di-spam saat proses kirim
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim Pesan...';
            formSuccess.style.display = 'none';

            // Ambil data nilai dari formulir
            const nama = document.getElementById('nama').value.trim();
            const status = document.getElementById('status').value;
            const username = document.getElementById('username_discord').value.trim();
            const pesan = document.getElementById('pesan').value.trim();

            // URL WEBHOOK DISCORD
            const webhookURL = "https://discord.com/api/webhooks/1543341313385299979/u9N1cFiQ3Bra8p8gHWUxsMUgjup5C8xcb7TmXKGORl82G-gCf_Ed6XjHcFbt3p76QhI7";

            // Format embed pesan Discord yang cantik
            const payload = {
                username: "Santoen Web Bot",
                avatar_url: "https://pganteng.github.io/logo-sman10.png",
                embeds: [
                    {
                        title: "📩 Pesan Baru dari Web Komunitas Santoen",
                        color: 3447003, // Warna Biru Discord (Decimal)
                        fields: [
                            { name: "👤 Nama Lengkap", value: nama, inline: true },
                            { name: "🎓 Status / Peran", value: status, inline: true },
                            { name: "🆔 Discord / Contact", value: username, inline: false },
                            { name: "💬 Pesan / Catatan", value: pesan, inline: false }
                        ],
                        footer: {
                            text: "SMAN 10 Depok Web Integration"
                        },
                        timestamp: new Date()
                    }
                ]
            };

            try {
                const response = await fetch(webhookURL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (response.ok || response.status === 24) {
                    formSuccess.innerHTML = '<i class="fas fa-check-circle"></i> Berhasil! Pesan kamu telah dikirim ke Server Discord SMAN 10 Depok.';
                    formSuccess.className = 'form-success-msg success';
                    formSuccess.style.display = 'block';
                    santoenForm.reset();
                } else {
                    throw new Error('Gagal terhubung ke Discord Server');
                }
            } catch (error) {
                console.error('Webhook Error:', error);
                formSuccess.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Gagal mengirim pesan. Silakan coba beberapa saat lagi.';
                formSuccess.className = 'form-success-msg error';
                formSuccess.style.display = 'block';
            } finally {
                // Kembalikan tombol ke kondisi semula
                btnSubmit.disabled = false;
                btnSubmit.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Langsung ke Discord';
            }
        });
    }

});
                             
