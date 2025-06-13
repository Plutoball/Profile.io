// Cache key elements.
const header = document.querySelector('.header');
const processContainer = document.querySelector('.process-container');
const designSteps = document.querySelectorAll("section[id^='design-step-']");
const progressBars = document.querySelectorAll(".process-divider .progress");
const stepElements = document.querySelectorAll(".process-actions .step");
const labels = document.querySelectorAll(".process-actions p");

// Set up the IntersectionObserver with a fine-grained threshold.
const observerOptions = {
  root: null,
  threshold: Array.from({ length: 101 }, (_, i) => i / 100)
};

designSteps.forEach((step, idx) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const currentHeaderHeight = header.getBoundingClientRect().height;
      let fill = 0;
      
      // Only update progress if the process container is already sticky.
      if (processContainer.getBoundingClientRect().top <= currentHeaderHeight) {
        const rect = entry.boundingClientRect;
        // If the design step hasn't reached the sticky area, keep fill at 0.
        if (rect.top >= currentHeaderHeight) {
          fill = 0;
        } else {
          // Calculate fill as the proportion of the design step that has moved above the header.
          fill = ((currentHeaderHeight - rect.top) / rect.height) * 100;
          // Clamp the value between 0 and 100.
          fill = Math.min(Math.max(fill, 0), 100);
        }
      } else {
        fill = 0;
      }
      
      // Apply the calculated fill to the corresponding progress bar.
      if (progressBars[idx]) {
        progressBars[idx].style.width = fill + "%";
      }
      
      // Update the corresponding step indicator (.step) and label (<p>) styling.
      if (stepElements[idx] && labels[idx]) {
        if (fill > 0) {
          stepElements[idx].style.color = "#007bff";       // Active blue.
          stepElements[idx].style.fontWeight = "600";
          labels[idx].style.color = "white";
          labels[idx].style.fontWeight = "500";
        } else {
          stepElements[idx].style.color = "#333";
          stepElements[idx].style.fontWeight = "normal";
          labels[idx].style.color = "#333";
          labels[idx].style.fontWeight = "normal";
        }
      }
    });
  }, observerOptions);
  
  // Begin observing this design step.
  observer.observe(step);
});
