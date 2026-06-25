// ===== Contact Form =====
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("contactName").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const message = document.getElementById("contactMessage").value.trim();

  document.getElementById("contactError").textContent = "";
  document.getElementById("contactSuccessMsg").textContent = "";

  // check that all fields are filled in
  if (name === "" || email === "" || message === "") {
    document.getElementById("contactError").textContent = "Please fill in all fields before submitting.";
    return;
  }

  // show a simple confirmation message and reset the form
  document.getElementById("contactSuccessMsg").textContent = "Thank you for reaching out. We will get back to you soon.";
  contactForm.reset();
});
