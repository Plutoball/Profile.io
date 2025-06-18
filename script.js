window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


window.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('kebabToggle');
  const navMenu = document.getElementById('mobileMenu');

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
});
// Close the mobile menu when a link is clicked
const navLinks = document.querySelectorAll('#mobileMenu a');    
