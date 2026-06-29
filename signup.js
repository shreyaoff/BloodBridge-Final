const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("signupUsername").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const confirmPassword = document.getElementById("signupConfirmPassword").value.trim();

  document.getElementById("signupUsernameError").textContent = "";
  document.getElementById("signupPasswordError").textContent = "";
  document.getElementById("signupConfirmPasswordError").textContent = "";
  document.getElementById("signupSuccessMsg").textContent = "";

  let isValid = true;

  if (username === "") {
    document.getElementById("signupUsernameError").textContent = "Please enter a username.";
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
  const existingUser = users.find(function (user) {
    return user.username === username;
  });

  if (existingUser) {
    document.getElementById("signupUsernameError").textContent = "This username is already taken.";
    return;
  }

  users.push({ username: username, password: password });
  localStorage.setItem("users", JSON.stringify(users));

  document.getElementById("signupSuccessMsg").textContent = "Account created. Redirecting to login...";

  setTimeout(function () {
    window.location.href = "login.html";
  }, 1000);
});
