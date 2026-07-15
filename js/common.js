// ===== Dark Mode Toggle (runs on every page) =====
const darkModeBtn = document.getElementById("darkModeBtn");
darkModeBtn.textContent = localStorage.getItem("darkMode") === "on" ? "☀️" : "🌙";

// load saved dark mode setting
if (localStorage.getItem("darkMode") === "on") {
  document.body.classList.add("dark-mode");
}

darkModeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "on");
    darkModeBtn.textContent = "☀️";
  } else {
    localStorage.setItem("darkMode", "off");
    darkModeBtn.textContent = "🌙";
  }
});

// ===== Nav Dropdown Toggle (runs on every page) =====
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

dropdownToggles.forEach(function (btn) {
  const menu = btn.nextElementSibling;

  btn.addEventListener("click", function (event) {
    event.stopPropagation();
    const isOpen = menu.classList.contains("open");

    dropdownToggles.forEach(function (otherBtn) {
      otherBtn.classList.remove("open");
      otherBtn.nextElementSibling.classList.remove("open");
    });

    if (!isOpen) {
      menu.classList.add("open");
      btn.classList.add("open");
    }
  });
});

document.addEventListener("click", function (event) {
  dropdownToggles.forEach(function (btn) {
    const menu = btn.nextElementSibling;
    if (!menu.contains(event.target) && event.target !== btn) {
      menu.classList.remove("open");
      btn.classList.remove("open");
    }
  });
});

// ===== Hamburger Menu Toggle (runs on every page) =====
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");

if (hamburgerBtn && navLinks) {
  hamburgerBtn.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    hamburgerBtn.classList.toggle("open");
    hamburgerBtn.setAttribute("aria-expanded", isOpen);
  });
}

