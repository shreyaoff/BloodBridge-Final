const signupForm = document.getElementById("signupForm");

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
  document.getElementById("signupSuccessMsg").textContent = "";

  let isValid = true;

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

  const usernameTaken = users.some(function (user) {
    return user.username === username;
  });

  if (usernameTaken) {
    document.getElementById("signupUsernameError").textContent = "This username is already taken.";
    return;
  }

  const emailTaken = users.some(function (user) {
    return user.email === email;
  });

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
