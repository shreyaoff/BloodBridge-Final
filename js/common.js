const darkModeBtn = document.getElementById("darkModeBtn");

if (localStorage.getItem("darkMode") === "on") {
  document.body.classList.add("dark-mode");
  darkModeBtn.textContent = "☀️";
} else {
  darkModeBtn.textContent = "🌙";
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

const dropdownButtons = document.querySelectorAll(".dropdown-toggle");

for (let i = 0; i < dropdownButtons.length; i++) {
  const button = dropdownButtons[i];
  const menu = button.nextElementSibling;

  button.addEventListener("click", function () {
    const isOpen = menu.classList.contains("open");

    for (let j = 0; j < dropdownButtons.length; j++) {
      dropdownButtons[j].nextElementSibling.classList.remove("open");
    }

    if (!isOpen) {
      menu.classList.add("open");
    }
  });
}

const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");

if (hamburgerBtn && navLinks) {
  hamburgerBtn.addEventListener("click", function () {
    navLinks.classList.toggle("open");
    hamburgerBtn.classList.toggle("open");
  });
}
