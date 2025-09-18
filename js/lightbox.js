document.addEventListener("DOMContentLoaded", () => {
  // Collect gallery images (DOM elements)
  const galleryImages = document.querySelectorAll(".gallery img");
  const images = Array.from(galleryImages).map(img => img.src);

  let currentIndex = 0;

  // Lightbox elements
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const prevBtn = document.querySelector(".lightbox .prev");
  const nextBtn = document.querySelector(".lightbox .next");
  const closeBtn = document.querySelector(".lightbox .close"); // ✅ FIXED

  // Ensure hidden on load
  lightbox.style.display = "none";

  // Show an image with fade transition
  function showImage(index) {
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;

    // Start fade-out
    lightboxImg.classList.add("fade-out");

    setTimeout(() => {
      // Swap image source
      lightboxImg.src = images[index];
      currentIndex = index;

      // Once image loads, fade back in
      lightboxImg.onload = () => {
        lightboxImg.classList.remove("fade-out");
        lightboxImg.classList.add("fade-in");

        setTimeout(() => {
          lightboxImg.classList.remove("fade-in");
        }, 300); // match CSS fade duration
      };
    }, 300); // match CSS fade duration
  }

  // Open lightbox on gallery image click
  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentIndex = index;
      showImage(currentIndex);
      lightbox.style.display = "flex";
      document.body.classList.add("no-scroll");
    });
  });

  // Navigation buttons
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showImage(currentIndex - 1);
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showImage(currentIndex + 1);
  });

  // Close when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
      document.body.classList.remove("no-scroll");
    }
  });

  // ✅ Close button
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    lightbox.style.display = "none";
    document.body.classList.remove("no-scroll");
  });
    

  // Keyboard support
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "ArrowRight") showImage(currentIndex + 1);
      if (e.key === "ArrowLeft") showImage(currentIndex - 1);
      if (e.key === "Escape") {
        lightbox.style.display = "none";
        document.body.classList.remove("no-scroll");
      }
    }
  });
});

const content = document.querySelector('.content');

// fade out old content
content.classList.add('fade-out');

// after transition ends, load new content
setTimeout(() => {
  // replace iframe src or content here
  content.classList.remove('fade-out');
  content.classList.add('fade-in');
}, 300); // match transition time
