const signupForm = document.getElementById("signupForm");
const termsStatus = document.getElementById("termsStatus");

if (localStorage.getItem("acceptedTerms") === "true") {
  termsStatus.textContent = "Terms & Conditions accepted.";
  termsStatus.classList.remove("terms-not-accepted");
  termsStatus.classList.add("terms-accepted");
}

signupForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("signupUsername").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const confirmPassword = document.getElementById("signupConfirmPassword").value.trim();

  document.getElementById("signupUsernameError").textContent = "";
  document.getElementById("signupEmailError").textContent = "";
  document.getElementById("signupPasswordError").textContent = "";
  document.getElementById("signupConfirmPasswordError").textContent = "";
  document.getElementById("signupTermsError").textContent = "";
  document.getElementById("signupSuccessMsg").textContent = "";

  let isValid = true;

  if (localStorage.getItem("acceptedTerms") !== "true") {
    document.getElementById("signupTermsError").textContent = "Please read and accept the Terms & Conditions first.";
    isValid = false;
  }

  if (username === "") {
    document.getElementById("signupUsernameError").textContent = "Please enter a username.";
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    document.getElementById("signupEmailError").textContent = "Please enter your email.";
    isValid = false;
  } else if (!emailPattern.test(email)) {
    document.getElementById("signupEmailError").textContent = "Please enter a valid email address.";
    isValid = false;
  }

  if (password === "") {
    document.getElementById("signupPasswordError").textContent = "Please enter a password.";
    isValid = false;
  } else if (password.length < 6) {
    document.getElementById("signupPasswordError").textContent = "Password must be at least 6 characters.";
    isValid = false;
  }

  if (confirmPassword === "") {
    document.getElementById("signupConfirmPasswordError").textContent = "Please confirm your password.";
    isValid = false;
  } else if (password !== confirmPassword) {
    document.getElementById("signupConfirmPasswordError").textContent = "Passwords do not match.";
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  let usernameTaken = false;
  let emailTaken = false;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      usernameTaken = true;
    }
    if (users[i].email === email) {
      emailTaken = true;
    }
  }

  if (usernameTaken) {
    document.getElementById("signupUsernameError").textContent = "This username is already taken.";
    return;
  }

  if (emailTaken) {
    document.getElementById("signupEmailError").textContent = "This email is already registered.";
    return;
  }

  users.push({ username: username, email: email, password: password });
  localStorage.setItem("users", JSON.stringify(users));

  document.getElementById("signupSuccessMsg").textContent = "Account created. Redirecting to login...";

  setTimeout(function () {
    window.location.href = "login.html";
  }, 1000);
});
