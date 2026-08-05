$("#dob").datepicker({ dateFormat: "dd/mm/yy", changeMonth: true, changeYear: true, yearRange: "1950:2010" });
$("#lastDonation").datepicker({ dateFormat: "dd/mm/yy", changeMonth: true, changeYear: true, maxDate: "0" });

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const dob = document.getElementById("dob").value;
  const bloodGroup = document.getElementById("bloodGroup").value;
  const district = document.getElementById("district").value.trim();
  const address = document.getElementById("address").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const lastDonation = document.getElementById("lastDonation").value;
  const haveDonatedInput = document.querySelector('input[name="haveDonated"]:checked');
  const haveDonated = haveDonatedInput ? haveDonatedInput.value : "";

  document.getElementById("nameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("dobError").textContent = "";
  document.getElementById("bloodGroupError").textContent = "";
  document.getElementById("districtError").textContent = "";
  document.getElementById("addressError").textContent = "";
  document.getElementById("contactError").textContent = "";
  document.getElementById("haveDonatedError").textContent = "";
  document.getElementById("successMsg").textContent = "";

  let isValid = true;

  if (fullName === "") {
    document.getElementById("nameError").textContent = "Please enter your full name.";
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    document.getElementById("emailError").textContent = "Please enter your email.";
    isValid = false;
  } else if (!emailPattern.test(email)) {
    document.getElementById("emailError").textContent = "Enter a valid email address.";
    isValid = false;
  }

  if (dob === "") {
    document.getElementById("dobError").textContent = "Please enter your date of birth.";
    isValid = false;
  }

  if (bloodGroup === "") {
    document.getElementById("bloodGroupError").textContent = "Please select your blood group.";
    isValid = false;
  }

  if (district === "") {
    document.getElementById("districtError").textContent = "Please enter your district.";
    isValid = false;
  }

  if (address === "") {
    document.getElementById("addressError").textContent = "Please enter your current address.";
    isValid = false;
  }

  const contactPattern = /^9[0-9]{9}$/;
  if (contact === "") {
    document.getElementById("contactError").textContent = "Please enter your contact number.";
    isValid = false;
  } else if (!contactPattern.test(contact)) {
    document.getElementById("contactError").textContent = "Enter a valid 10 digit number starting with 9.";
    isValid = false;
  }

  if (haveDonated === "") {
    document.getElementById("haveDonatedError").textContent = "Please select Yes or No.";
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  const newDonor = {
    fullName: fullName,
    email: email,
    dob: dob,
    bloodGroup: bloodGroup,
    district: district,
    address: address,
    contact: contact,
    lastDonation: lastDonation,
    haveDonated: haveDonated
  };

  const donors = JSON.parse(localStorage.getItem("donors")) || [];
  donors.push(newDonor);
  localStorage.setItem("donors", JSON.stringify(donors));

  document.getElementById("successMsg").textContent = "You have been registered as a donor. Thank you!";
  registerForm.reset();
});
