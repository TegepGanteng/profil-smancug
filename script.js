document.addEventListener('DOMContentLoaded', () => {

    // 1. INISIALISASI AOS (ANIMATE ON SCROLL)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }

    // 2. HERO SLIDER AUTOMATIC
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); // Berganti setiap 5 detik
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

    // 4. TYPEWRITER EFEK (DIBERSIHKAN AGAR TIDAK DOUBLE/BERULANG)
    const textElement = document.getElementById('typewriter');
    if (textElement) {
        textElement.innerHTML = ""; // Reset teks sebelum diketik
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

    // 5. ANIMASI ANIMATED COUNTER (STATISTIK)
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

    // 6. INISIALISASI VANILLA TILT (EFEK 3D CARD)
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
    }

    // 7. INJEKSI DINAMIS SOCIABLEKIT (FEED INSTAGRAM)
    if (document.querySelector('.sk-instagram-feed')) {
        const skScript = document.createElement('script');
        skScript.src = 'https://widgets.sociablekit.com/instagram-feed/widget.js';
        skScript.async = true;
        skScript.defer = true;
        document.body.appendChild(skScript);
    }

});
          
