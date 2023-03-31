//Note: functionality of the site unrelated to the bank movements

// Create an Intersection Observer object
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const lazyImage = entry.target;
      lazyImage.src = lazyImage.dataset.src;
      lazyImage.classList.remove('lazy');
      observer.unobserve(lazyImage);
    }
  });
});

// Select the images to be lazy loaded and register them with the Intersection Observer object
const lazyImages = document.querySelectorAll('.lazy');
lazyImages.forEach((lazyImage) => {
  observer.observe(lazyImage);
});



//Get the mobile navbar
const navToggle = document.querySelector('.mobile-nav-toggle');
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
