/* ===== TYPING EFFECT ===== */
const typedTextEl = document.getElementById("typedText");
const words = ["Frontend Developer", "UI/UX Designer", "Freelancer", "React Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typedTextEl.textContent = currentWord.substring(0, charIndex--);
    } else {
        typedTextEl.textContent = currentWord.substring(0, charIndex++);
    }

    let speed = isDeleting ? 60 : 120;

    if (!isDeleting && charIndex === currentWord.length + 1) {
        speed = 1800;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
    }
    setTimeout(type, speed);
}
type();

/* ===== NAVBAR SCROLL EFFECT ===== */
const header = document.getElementById("header");
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 40);
    scrollTopBtn.classList.toggle("show", y > 400);
    highlightNav();
});

/* ===== MOBILE MENU ===== */
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

/* ===== ACTIVE NAV LINK ON SCROLL ===== */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function highlightNav() {
    const scrollY = window.pageYOffset;
    sections.forEach((sec) => {
        const top = sec.offsetTop - 120;
        const height = sec.offsetHeight;
        const id = sec.getAttribute("id");

        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach((l) => l.classList.remove("active"));
            const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
            if (activeLink) activeLink.classList.add("active");
        }
    });
}

/* ===== SCROLL TO TOP ===== */
scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ===== REVEAL ON SCROLL ===== */
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ===== SKILL PROGRESS BARS ===== */
const skillObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const bar = entry.target.querySelector(".progress-bar");
                if (bar) bar.style.width = bar.dataset.width;
                skillObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.4 }
);
document.querySelectorAll(".skill-card").forEach((card) => skillObserver.observe(card));

/* ===== THEME TOGGLE ===== */
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");

// Load saved theme
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    themeIcon.classList.replace("fa-moon", "fa-sun");
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    themeIcon.classList.toggle("fa-moon", !isLight);
    themeIcon.classList.toggle("fa-sun", isLight);
    localStorage.setItem("theme", isLight ? "light" : "dark");
});

/* ===== CUSTOM CURSOR ===== */
const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

if (window.innerWidth > 900) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + "px";
        cursor.style.top = mouseY + "px";
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        follower.style.left = followerX + "px";
        follower.style.top = followerY + "px";
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effect on links & buttons
    document.querySelectorAll("a, button, .project-card").forEach((el) => {
        el.addEventListener("mouseenter", () => {
            follower.style.width = "60px";
            follower.style.height = "60px";
            follower.style.borderColor = "#ec4899";
        });
        el.addEventListener("mouseleave", () => {
            follower.style.width = "36px";
            follower.style.height = "36px";
            follower.style.borderColor = "#7c3aed";
        });
    });
}

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector("button");
    const originalHTML = btn.innerHTML;
    btn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = 'Sent! <i class="fa-solid fa-check"></i>';
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
            contactForm.reset();
        }, 1800);
    }, 1400);
});
