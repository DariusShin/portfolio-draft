const DOMS = {
    body: document.body,
    toggleThemeButton: document.querySelector('.button-toggle'),
    backToTopButton: document.getElementById('back-to-top'),
    scrollLinks: document.querySelectorAll('.scroll-link'),
    darkModeMediaQuery: window.matchMedia('(prefers-color-scheme: dark)'),
    skillsSection : document.getElementById("skills"),
    skillsContent: document.getElementsByClassName('skills-content'),
    skillsHeader : document.querySelectorAll('.skills-header'),
    projectDetails: document.querySelectorAll('.project-details'),
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
        } else {
            // Dynamiclly change the height of the skills section
            // Increase by 400px when open the last skills-content
            if (content.id = "last-area" && content.classList.contains('skills-close')) {
                DOMS.skillsSection.style.minHeight = "calc(100svh + 400px)";
            } else {
                DOMS.skillsSection.style.minHeight = "100svh";
            }
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

// get handler to stop the autoplay animation when user hover over slider
DOMS.projectDetails.forEach(detail => {
    detail.addEventListener("mouseover", () => {
        swiper.autoplay.stop();  // Use stop() to disable autoplay
    });

    detail.addEventListener("mouseout", () => {
        swiper.autoplay.start();  // Use start() to enable autoplay
    });
});


