// Lightbox
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox img");
const lightboxCaption = document.getElementById("lightbox-caption");
const closeBtn = document.querySelector(".lightbox .close");
const prevBtn = document.querySelector(".lightbox .prev");
const nextBtn = document.querySelector(".lightbox .next");
const photos = document.querySelectorAll(".photo img");

let currentIndex = 0;

if (lightbox && closeBtn && prevBtn && nextBtn) {
  photos.forEach((photo, index) => {
    photo.addEventListener("click", () => {
      currentIndex = index;
      showLightbox(photo);
    });
  });

  function showLightbox(photo) {
    lightbox.style.display = "block";
    lightboxImg.src = photo.src;
    lightboxCaption.textContent = photo.alt;
  }

  function showPhoto(index) {
    if (index >= 0 && index < photos.length) {
      currentIndex = index;
      lightboxImg.src = photos[currentIndex].src;
      lightboxCaption.textContent = photos[currentIndex].alt;
    }
  }

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  prevBtn.addEventListener("click", () => {
    showPhoto((currentIndex - 1 + photos.length) % photos.length);
  });

  nextBtn.addEventListener("click", () => {
    showPhoto((currentIndex + 1) % photos.length);
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "block") {
      if (e.key === "ArrowLeft") {
        showPhoto((currentIndex - 1 + photos.length) % photos.length);
      } else if (e.key === "ArrowRight") {
        showPhoto((currentIndex + 1) % photos.length);
      } else if (e.key === "Escape") {
        lightbox.style.display = "none";
      }
    }
  });
}

/*document.addEventListener("DOMContentLoaded", () => {
  const lazyImages = document.querySelectorAll("img.lazy");

  lazyImages.forEach(img => {
    img.addEventListener("load", () => {
      img.classList.add("loaded");
      img.parentElement.classList.add("loaded"); // hide spinner
    });
  });

  // Fallback lazy loading for older browsers
  if (!("loading" in HTMLImageElement.prototype)) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => {
      img.dataset.src = img.src;
      img.removeAttribute("src");
      observer.observe(img);
    });
  }
});
*/

document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".gallery img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox .close");

  images.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.classList.add("active");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });
});


  // Toggle sidebar + overlay
  hamburger.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Highlight active link + close sidebar on mobile
  links.forEach(link => {
    link.addEventListener("click", () => {
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      if (window.innerWidth <= 768) {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
        hamburger.classList.remove("active");
      }
    });
  });

  // Close sidebar when clicking overlay
  overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// Lightbox functionality for gallery images
document.addEventListener("click", function(e) {
  if (e.target.matches(".gallery img")) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    lightboxImg.src = e.target.src;
    lightbox.classList.add("active");
  }
});

document.addEventListener("click", function(e) {
  if (e.target.matches(".close") || e.target.id === "lightbox") {
    document.getElementById("lightbox").classList.remove("active");
  }
});

let currentIndex = -1;
let galleryImages = [];

let currentIndex = -1;
let galleryImages = [];

// Open lightbox when image clicked
document.addEventListener("click", function(e) {
  if (e.target.matches(".gallery img")) {
    galleryImages = Array.from(document.querySelectorAll(".gallery img"));
    currentIndex = galleryImages.indexOf(e.target);

    showImage(currentIndex);
    document.getElementById("lightbox").classList.add("active");
  }
});

// Close lightbox
document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("lightbox").classList.remove("active");
});

// Next / Prev arrows
document.querySelector(".next").addEventListener("click", () => {
  changeImage(1);
});
document.querySelector(".prev").addEventListener("click", () => {
  changeImage(-1);
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox.classList.contains("active")) return;

  if (e.key === "Escape") {
    lightbox.classList.remove("active");
  } else if (e.key === "ArrowRight") {
    changeImage(1);
  } else if (e.key === "ArrowLeft") {
    changeImage(-1);
  }
});

// Functions
function showImage(index) {
  const img = document.getElementById("lightbox-img");
  img.classList.remove("visible"); // fade out
  setTimeout(() => {
    img.src = galleryImages[index].src;
    img.onload = () => img.classList.add("visible"); // fade in
  }, 200);
}

function changeImage(direction) {
  currentIndex = (currentIndex + direction + galleryImages.length) % galleryImages.length;
  showImage(currentIndex);
}

/* -------- Page transition for iframe -------- */
const iframe = document.getElementById("content-frame");
if (iframe) {
  iframe.addEventListener("load", () => {
    iframe.classList.add("visible");
  });

  // fade out before nav link click
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
      iframe.classList.remove("visible");
    });
  });
}

// Functions
function showImage(index) {
  const img = document.getElementById("lightbox-img");
  img.src = galleryImages[index].src;
}

function changeImage(direction) {
  currentIndex = (currentIndex + direction + galleryImages.length) % galleryImages.length;
  showImage(currentIndex);
}


