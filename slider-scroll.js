const slider = document.getElementById('image-slider');
const slides = document.querySelectorAll('.slide');
const header = document.querySelector('.header');
let currentSlide = 0;
let isThrottled = false;

function showSlide(index) {
  // Hide current slide
  slides[currentSlide].classList.remove('active');
  // Set and show new slide
  currentSlide = index;
  slides[currentSlide].classList.add('active');
}

slider.addEventListener('wheel', (e) => {
  // As long as we're not on the last slide, block native scrolling.
  if (currentSlide !== slides.length - 1) {
    e.preventDefault();
  } else {
    // When on the last slide: if the user scrolls down (deltaY > 0),
    // let the event bubble so that the slider can scroll out of view.
    // If the user scrolls up (deltaY < 0), we want to intercept to go back a slide.
    if (e.deltaY < 0) {
      e.preventDefault();
    } else {
      return;
    }
  }
  
  // Simple throttle to prevent rapid firing.
  if (isThrottled) return;
  
  if (e.deltaY > 0) {
    // Scrolling down: if there's a next slide, show it.
    if (currentSlide < slides.length - 1) {
      showSlide(currentSlide + 1);
    }
  } else {
    // Scrolling up: if there's a previous slide, go back.
    if (currentSlide > 0) {
      showSlide(currentSlide - 1);
    }
  }
  
  isThrottled = true;
  setTimeout(() => {
    isThrottled = false;
  }, 800); // Adjust throttle delay as needed.
});
