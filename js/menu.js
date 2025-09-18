const sidebar = document.querySelector(".sidebar");
const hamburger = document.getElementById("hamburger");
const overlay = document.querySelector(".overlay");
const iframe = document.getElementById("content-frame");
const content = document.querySelector(".content");

// Handle all sidebar links
document.querySelectorAll(".sidebar a[target='content-frame']").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();

    // Fade out iframe
    iframe.classList.add("fade-out");

    setTimeout(() => {
      iframe.src = this.getAttribute("href");
    }, 300);

    setTimeout(() => {
      iframe.classList.remove("fade-out");
    }, 600);

    // Close sidebar on mobile
    if (sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
      hamburger.classList.remove("active");
      overlay.classList.remove("active");
      content.style.marginLeft = "0";
    }
  });
});

// Hamburger toggle
hamburger.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  hamburger.classList.toggle("active");
  overlay.classList.toggle("active");
});

// Overlay click closes sidebar
overlay.addEventListener("click", () => {
  sidebar.classList.remove("open");
  hamburger.classList.remove("active");
  overlay.classList.remove("active");
});
