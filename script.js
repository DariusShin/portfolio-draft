const DOMS = {
    body: document.body,
    backToTopButton: document.getElementById('back-to-top'),
    scrollLinks: document.querySelectorAll('.scroll-link'),
    darkModeMediaQuery: window.matchMedia('(prefers-color-scheme: dark)'),
    projectDetails: document.querySelectorAll('.project-details'),
};

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


