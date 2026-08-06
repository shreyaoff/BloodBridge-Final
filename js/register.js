$("#dob").datepicker({ dateFormat: "dd/mm/yy", changeMonth: true, changeYear: true, yearRange: "1950:2010" });
$("#lastDonation").datepicker({ dateFormat: "dd/mm/yy", changeMonth: true, changeYear: true, maxDate: "0" });

const registerForm = document.getElementById("registerForm");
if (!localStorage.getItem("donors")) {
  const sampleDonors = [
    { fullName: "Aarav Sharma", email: "aarav@example.com", dob: "12/05/1998", bloodGroup: "A+", district: "Kathmandu", address: "Baneshwor", contact: "9800000001", lastDonation: "10/01/2026", haveDonated: "Yes" },
    { fullName: "Sita Rai", email: "sita@example.com", dob: "18/07/1997", bloodGroup: "A-", district: "Lalitpur", address: "Jawalakhel", contact: "9800000002", lastDonation: "", haveDonated: "No" },
    { fullName: "Rohan Gurung", email: "rohan@example.com", dob: "05/11/1995", bloodGroup: "B+", district: "Bhaktapur", address: "Suryabinayak", contact: "9800000003", lastDonation: "14/03/2026", haveDonated: "Yes" },
    { fullName: "Anita KC", email: "anita@example.com", dob: "20/04/1999", bloodGroup: "B-", district: "Pokhara", address: "Lakeside", contact: "9800000004", lastDonation: "", haveDonated: "No" },
    { fullName: "Bikash Thapa", email: "bikash@example.com", dob: "01/01/1994", bloodGroup: "O+", district: "Chitwan", address: "Bharatpur", contact: "9800000005", lastDonation: "12/02/2026", haveDonated: "Yes" },
    { fullName: "Pooja Shrestha", email: "pooja@example.com", dob: "09/09/1998", bloodGroup: "O-", district: "Butwal", address: "Traffic Chowk", contact: "9800000006", lastDonation: "", haveDonated: "No" },
    { fullName: "Manish Adhikari", email: "manish@example.com", dob: "17/06/1993", bloodGroup: "AB+", district: "Dharan", address: "Putali Line", contact: "9800000007", lastDonation: "05/04/2026", haveDonated: "Yes" },
    { fullName: "Nisha Lama", email: "nisha@example.com", dob: "28/10/1996", bloodGroup: "AB-", district: "Biratnagar", address: "Main Road", contact: "9800000008", lastDonation: "", haveDonated: "No" }
  ];

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  while (sampleDonors.length < 25) {
    const i = sampleDonors.length;
    sampleDonors.push({
      fullName: "Donor " + (i + 1),
      email: "donor" + (i + 1) + "@example.com",
      dob: "01/01/1998",
      bloodGroup: bloodGroups[i % bloodGroups.length],
      district: "Kathmandu",
      address: "Sample Address",
      contact: "98" + String(10000000 + i),
      lastDonation: "",
      haveDonated: "No"
    });
  }

  localStorage.setItem("donors", JSON.stringify(sampleDonors));
}
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
