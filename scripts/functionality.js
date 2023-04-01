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

// Get all the operations tabs and content
const tabs = document.querySelectorAll('.operations-tab');
const contents = document.querySelectorAll('.operations-content');

// Event listener to each tab button
tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        // Get the data-tab attribute of the clicked tab button
        const tabId = tab.dataset.tab;

        // Remove the active class from all tabs and contents
        tabs.forEach((tab) => tab.classList.remove('operations-tab-active'));
        contents.forEach((content) =>
            content.classList.remove('operations-content-active')
        );

        // Add the active class to the clicked tab and content
        tab.classList.add('operations-tab-active');
        document
            .querySelector(`.operations-content-${tabId}`)
            .classList.add('operations-content-active');
    });
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




const slides = document.querySelectorAll('.slide');
const dots = document.querySelector('.dots');
const dotButtons = [];

// Create a button for each slide
slides.forEach((slide, index) => {
    const dotButton = document.createElement('button');
    dotButton.classList.add('dot');
    dots.appendChild(dotButton);
    dotButtons.push(dotButton);
});

let currentSlide = 0;

// Set the first slide as active
slides[currentSlide].classList.add('slide-active');
dotButtons[currentSlide].classList.add('dot-active');

// Move to the next slide
function nextSlide() {
    // Remove the active class from the current slide and dot
    slides[currentSlide].classList.remove('slide-active');
    dotButtons[currentSlide].classList.remove('dot-active');

    // Move to the next slide and wrap around if at the end
    currentSlide = (currentSlide + 1) % slides.length;

    // Add the active class to the new slide and dot
    slides[currentSlide].classList.add('slide-active');
    dotButtons[currentSlide].classList.add('dot-active');
}

// Move to the previous slide
function prevSlide() {
    // Remove the active class from the current slide and dot
    slides[currentSlide].classList.remove('slide-active');
    dotButtons[currentSlide].classList.remove('dot-active');

    // Move to the previous slide and wrap around if at the beginning
    currentSlide = (currentSlide + slides.length - 1) % slides.length;

    // Add the active class to the new slide and dot
    slides[currentSlide].classList.add('slide-active');
    dotButtons[currentSlide].classList.add('dot-active');
}

// Add click event listeners to the arrow buttons
const leftButton = document.querySelector('.slider-btn-left');
leftButton.addEventListener('click', prevSlide);

const rightButton = document.querySelector('.slider-btn-right');
rightButton.addEventListener('click', nextSlide);

// Add click event listeners to the dots
dotButtons.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        // Move to the clicked slide
        if (index !== currentSlide) {
            // Remove the active class from the current slide and dot
            slides[currentSlide].classList.remove('slide-active');
            dotButtons[currentSlide].classList.remove('dot-active');

            // Move to the clicked slide and add the active class
            currentSlide = index;
            slides[currentSlide].classList.add('slide-active');
            dotButtons[currentSlide].classList.add('dot-active');
        }
    });
});
