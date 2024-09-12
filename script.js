const DOMS = {
    body: document.body,
    toggleThemeButton: document.querySelector('.button-toggle'),
    backToTopButton: document.getElementById('back-to-top'),
    scrollLinks: document.querySelectorAll('.scroll-link'),
    darkModeMediaQuery: window.matchMedia('(prefers-color-scheme: dark)'),
    skillsContent: document.getElementsByClassName('skills-content'),
    skillsHeader : document.querySelectorAll('.skills-header'),
};

// Function to check system color scheme preference
function prefersDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Function to set the initial theme
function setInitialTheme() {
    if (prefersDarkMode()) {
        DOMS.body.classList.add('dark');
    }
}

// Handler to manually toggle color theme
DOMS.toggleThemeButton.addEventListener('click', () => {
    DOMS.body.classList.toggle("dark");
});

// Listen for changes in system color scheme
DOMS.darkModeMediaQuery.addEventListener('change', (e) => {
    if (e.matches) {
        DOMS.body.classList.add('dark');
    } else {
        DOMS.body.classList.remove('dark');
    }
});

// Handler to toggle state of anchor elements
DOMS.scrollLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Remove 'active-link' class from all links
        DOMS.scrollLinks.forEach(item => {
            item.classList.remove('active-link');
        });
        // Add 'active-link' class to the clicked link except for the 'Download CV' link
        if (this.textContent !== 'Download CV'){
            this.classList.add('active-link');
        }
    });
});

// Back to Top button functionality
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    let backToTopButton = document.getElementById("back-to-top");
    if (DOMS.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
}

// Skills section
// Accordion skills
function toggleSkills() {
    const clickedContent = this.closest('.skills-content');

    let content;
    // Close all skills content
    for(i = 0; i < DOMS.skillsContent.length; i++) {
        content = DOMS.skillsContent[i];
        if (content !== clickedContent) {
            content.classList.add('skills-close');
        }
    }

    // Toggle the clicked content
    clickedContent.classList.toggle('skills-close');
}

DOMS.skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills);
});

// Initialize all skills as closed
document.addEventListener('DOMContentLoaded', () => {
    for(i = 0; i < DOMS.skillsContent.length; i++) {
        DOMS.skillsContent[i].classList.add('skills-close');
    }
});

setInitialTheme();

// Project section
// Carousel Slider with Swiper.js
// Initialize Swiper
const swiper = new Swiper('.swiper', {
    slidesPerView: 1, // Number of slides to show at once
    spaceBetween: 20, // Space between slides
    // Optional: Add more configurations as needed
    centeredSlides: true,
    grabCursor: true,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
        clickable: true,
    },
});


