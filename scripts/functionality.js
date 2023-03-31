//Note: functionality of the site unrelated to the bank movements

// Event listener for navigation toggle from hamburger menu to normal and vice versa
navToggle.addEventListener('click', () => {
    const primaryNav = document.querySelector('.primary-navigation');
    const visibility = primaryNav.getAttribute('data-visible');

    if (visibility === 'false') {
        primaryNav.setAttribute('data-visible', true);
        navToggle.setAttribute('aria-expanded', true);
    } else if (visibility === 'true') {
        primaryNav.setAttribute('data-visible', false);
        navToggle.setAttribute('aria-expanded', false);
    }
    console.log(visibility);
});
