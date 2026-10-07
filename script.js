/* =========================================
   PORTFOLIO JAVASCRIPT
========================================= */


/* =========================================
   STARTUP LOADER
========================================= */

const loader = document.getElementById("loader");
const loadingText = document.getElementById("loadingText");
const loadingProgress = document.getElementById("loadingProgress");

const loadingMessages = [
    "Loading developer profile...",
    "Initializing projects...",
    "Loading skills...",
    "Connecting social profiles...",
    "Preparing portfolio..."
];

let progress = 0;
let messageIndex = 0;

const loadingInterval = setInterval(() => {

    progress += 2;

    loadingProgress.style.width = progress + "%";

    if (
        progress % 20 === 0 &&
        messageIndex < loadingMessages.length
    ) {

        loadingText.textContent =
            loadingMessages[messageIndex];

        messageIndex++;

    }

    if (progress >= 100) {

        clearInterval(loadingInterval);

        loadingText.textContent =
            "Portfolio ready.";

        setTimeout(() => {

            loader.classList.add("hidden");

            document.body.classList.add("loaded");

        }, 600);

    }

}, 40);


/* =========================================
   CUSTOM CURSOR
========================================= */

const cursor = document.querySelector(".cursor");
const cursorRing = document.querySelector(".cursor-ring");

let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;

document.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";

});


function animateCursor() {

    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    cursorRing.style.left = ringX + "px";
    cursorRing.style.top = ringY + "px";

    requestAnimationFrame(animateCursor);

}

animateCursor();


/* Cursor hover effect */

const interactiveElements =
    document.querySelectorAll("a, button, .project-card, .skill-box");

interactiveElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {

        cursorRing.style.width = "50px";
        cursorRing.style.height = "50px";

    });

    element.addEventListener("mouseleave", () => {

        cursorRing.style.width = "32px";
        cursorRing.style.height = "32px";

    });

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    revealObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================
   3D TILT CARDS
========================================= */

const tiltCards =
    document.querySelectorAll(".tilt");

tiltCards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        if (window.innerWidth < 800) return;

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -5;

        const rotateY =
            ((x - centerX) / centerX) * 5;

        card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-4px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(900px) rotateX(0deg) rotateY(0deg)";

    });

});


/* =========================================
   PARTICLE BACKGROUND
========================================= */

const canvas =
    document.getElementById("particles");

const ctx =
    canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


function createParticles() {

    particles = [];

    const count =
        window.innerWidth < 700
            ? 35
            : 70;

    for (let i = 0; i < count; i++) {

        particles.push({

            x: Math.random() *
                canvas.width,

            y: Math.random() *
                canvas.height,

            size:
                Math.random() * 1.8 + 0.5,

            speedX:
                (Math.random() - 0.5) *
                0.25,

            speedY:
                (Math.random() - 0.5) *
                0.25,

            opacity:
                Math.random() *
                0.5 +
                0.1

        });

    }

}

createParticles();


function drawParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach((particle) => {

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0)
            particle.x = canvas.width;

        if (particle.x > canvas.width)
            particle.x = 0;

        if (particle.y < 0)
            particle.y = canvas.height;

        if (particle.y > canvas.height)
            particle.y = 0;

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(34,211,238,${particle.opacity})`;

        ctx.fill();

    });

    requestAnimationFrame(drawParticles);

}

drawParticles();


/* =========================================
   MOBILE MENU
========================================= */

const menuButton =
    document.getElementById("menuButton");

const navLinks =
    document.querySelector(".nav-links");


menuButton.addEventListener("click", () => {

    navLinks.classList.toggle(
        "mobile-open"
    );

});


/* Close mobile menu */

document.querySelectorAll(
    ".nav-links a"
).forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove(
            "mobile-open"
        );

    });

});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navigationLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 150;

            if (
                window.scrollY >=
                sectionTop
            ) {

                current =
                    section.getAttribute("id");

            }

        });

        navigationLinks.forEach((link) => {

            link.style.color = "";

            if (
                link.getAttribute("href") ===
                "#" + current
            ) {

                link.style.color =
                    "#22d3ee";

            }

        });

    }
);


/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log(
    "%c👋 Hey! Welcome to Harsha's Portfolio.",
    "color:#22d3ee;font-size:16px;font-weight:bold;"
);

console.log(
    "%cBuilt with HTML, CSS & JavaScript.",
    "color:#94a3b8;font-size:12px;"
);