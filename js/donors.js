const donorTableBody = document.getElementById("donorTableBody");
const noDonorsMsg = document.getElementById("noDonorsMsg");

function loadDonors() {
  const donors = JSON.parse(localStorage.getItem("donors")) || [];

  donorTableBody.innerHTML = "";

  if (donors.length === 0) {
    noDonorsMsg.style.display = "block";
    return;
  }

  noDonorsMsg.style.display = "none";

  for (let i = 0; i < donors.length; i++) {
    const donor = donors[i];
    const row = document.createElement("tr");

    const lastDonationText = donor.lastDonation ? donor.lastDonation : "Not provided";

    row.innerHTML =
      "<td>" + donor.fullName + "</td>" +
      "<td>" + donor.bloodGroup + "</td>" +
      "<td>" + donor.district + "</td>" +
      "<td>" + donor.contact + "</td>" +
      "<td>" + lastDonationText + "</td>" +
      "<td><button class='delete-btn' data-index='" + i + "'>Delete</button></td>";

    donorTableBody.appendChild(row);
  }
}

donorTableBody.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    const indexToDelete = event.target.getAttribute("data-index");

    const donors = JSON.parse(localStorage.getItem("donors")) || [];
    donors.splice(indexToDelete, 1);
    localStorage.setItem("donors", JSON.stringify(donors));

    loadDonors();
  }
});

loadDonors();
