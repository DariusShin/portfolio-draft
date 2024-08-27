const DOMS = {
    body: document.body,
    toggleThemeButton: document.querySelector('.button-toggle'),
    backToTopButton: document.getElementById('back-to-top'),
};

// Handler to manually toggle color theme
DOMS.toggleThemeButton.addEventListener('click', () => {
    DOMS.body.classList.toggle("dark");
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

DOMS.backToTopButton.onclick = function() {
    DOMS.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
}