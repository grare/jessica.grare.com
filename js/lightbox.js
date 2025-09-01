var images = document.querySelectorAll(".gallery img");
var lightbox = document.getElementById("lightbox");
var lightboxImg = document.getElementById("lightbox-img");
var closeBtn = document.querySelector(".lightbox .close");
var prevBtn = document.querySelector(".lightbox .prev");
var nextBtn = document.querySelector(".lightbox .next");

let currentIndex = 0;

images.forEach((img, index) => {
  img.addEventListener("click", () => {
    lightbox.style.display = "block";
    lightboxImg.src = img.src;
    currentIndex = index;
  });
});

function showImage(index) {
  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;
  lightboxImg.src = images[index].src;
  currentIndex = index;
}

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

prevBtn.addEventListener("click", () => {
  showImage(currentIndex - 1);
});

nextBtn.addEventListener("click", () => {
  showImage(currentIndex + 1);
});

// Keyboard support
document.addEventListener("keydown", e => {
  if (lightbox.style.display === "block") {
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
    if (e.key === "Escape") lightbox.style.display = "none";
  }
});
