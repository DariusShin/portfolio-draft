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
    let itemClass = this.parentNode.className;

    for(i = 0; i < DOMS.skillsContent.length; i++){
        DOMS.skillsContent[i].className = 'skills-content skills-close';
    }
    if (itemClass === 'skills-content skills-close'){
        this.parentNode.className ='skills-content';
    }
}

DOMS.skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills);
});

setInitialTheme();

