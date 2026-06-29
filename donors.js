// ===== Donor List =====
const donorTableBody = document.getElementById("donorTableBody");
const noDonorsMsg = document.getElementById("noDonorsMsg");

function loadDonors() {
  // get donors from localStorage
  const donors = JSON.parse(localStorage.getItem("donors")) || [];

  // clear the table body before rebuilding it
  donorTableBody.innerHTML = "";

  if (donors.length === 0) {
    noDonorsMsg.style.display = "block";
    return;
  }

  noDonorsMsg.style.display = "none";

  // create one row for each donor
  donors.forEach(function (donor, index) {
    const row = document.createElement("tr");

    const lastDonationText = donor.lastDonation ? donor.lastDonation : "Not provided";

    row.innerHTML =
      "<td>" + donor.fullName + "</td>" +
      "<td>" + donor.bloodGroup + "</td>" +
      "<td>" + donor.district + "</td>" +
      "<td>" + donor.contact + "</td>" +
      "<td>" + lastDonationText + "</td>" +
      "<td><button class='delete-btn' data-index='" + index + "'>Delete</button></td>";

    donorTableBody.appendChild(row);
  });
}

// handle delete button clicks using event delegation on the table body
donorTableBody.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    const indexToDelete = event.target.getAttribute("data-index");

    const donors = JSON.parse(localStorage.getItem("donors")) || [];
    donors.splice(indexToDelete, 1);
    localStorage.setItem("donors", JSON.stringify(donors));

    // reload the table so it reflects the deletion immediately
    loadDonors();
  }
});

// load the donor table when the page opens
loadDonors();
