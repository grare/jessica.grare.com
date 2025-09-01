// Handle all sidebar links (including "My Portfolio")
document.querySelectorAll(".sidebar a[target='content-frame']").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const iframe = document.getElementById("content-frame");

    // Fade out
    iframe.classList.add("fade-out");

    setTimeout(() => {
      iframe.src = this.getAttribute("href");
    }, 300);

    setTimeout(() => {
      iframe.classList.remove("fade-out");
    }, 600);

    // Close sidebar on mobile when a link is clicked
    const sidebar = document.querySelector(".sidebar");
    const hamburger = document.getElementById("hamburger");
    const content = document.querySelector(".content");

    if (sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
      hamburger.classList.remove("active");
      content.style.marginLeft = "0"; // reset for mobile
    }
  });
});

// Mobile hamburger toggle
const hamburger = document.getElementById("hamburger");
const sidebar = document.querySelector(".sidebar");
const content = document.querySelector(".content");

hamburger.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  hamburger.classList.toggle("active");

  if (sidebar.classList.contains("open")) {
    content.style.marginLeft = "250px"; // match sidebar width
  } else {
    content.style.marginLeft = "0";
  }
});
