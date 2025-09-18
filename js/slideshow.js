document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-slideshow .slide");
  let currentIndex = 0;
  const interval = 5000; // 5 seconds per slide

  function showNextSlide() {
    slides[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add("active");
  }

  setInterval(showNextSlide, interval);
});
