window.onload = function () {
  document.querySelector("#loader").style.display = "none";
  document.querySelector("#content").style.display = "block";
};


var today = new Date().toISOString().split('T')[0];
document.querySelector("#date").setAttribute('min', today);

const phoneForm = document.getElementById("phone-form");
const verifyForm = document.getElementById("verify-form");
const campForm = document.getElementById("camp-form");
const phoneDiv = document.getElementById("phone-div");
const campDiv = document.getElementById("camp-div");
const verifyDiv = document.getElementById("verify-div");
const responseText = document.getElementById("response-text");

let phoneNumber;

phoneForm.addEventListener("submit", async (e) => {
  loader.style.display = "block";
  content.style.display = "none";
  e.preventDefault();

  phoneNumber = document.getElementById("phone-number-input").value;

  const response = await fetch("https://dabjab.herokuapp.com/sendotp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phoneNumber: phoneNumber }),
  }).catch((e) => console.log(e));

  loader.style.display = "none";
  content.style.display = "block";

  if (response.ok) {
    phoneDiv.style.display = "none";
    phoneForm.style.display = "none";
    verifyForm.style.display = "block";
    verifyDiv.style.display = "block";
  }
});

verifyForm.addEventListener("submit", async (e) => {
  loader.style.display = "block";
  content.style.display = "none";
  e.preventDefault();

  const otp = document.getElementById("otp-input").value;

  const data = {
    phoneNumber: phoneNumber,
    code: otp,
  };

  const response = await fetch("https://dabjab.herokuapp.com/verifyotp", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  }).catch((e) => console.log(e));

  const check = await response.json();

  const text = response.ok ? check.status : response.statusText;
  
  loader.style.display = "none";
  content.style.display = "block";

  if (response.ok === true) {
    verifyForm.style.display = "none";
    verifyDiv.style.display = "none";
    alert(`******${phoneNumber.slice(6, 11)} Verified! Please Fill the form!`);
    campDiv.style.display = "block";
    campForm.style.display = "block";
    document.querySelector("#phone").value = phoneNumber;
  } else {
    alert(`Wrong OTP entered!`);
  }
});

campForm.addEventListener("submit", async (e) => {
  loader.style.display = "block";
  content.style.display = "none";
  e.preventDefault();
  phoneNumber = document.querySelector("#phone-number-input").value;

  document.querySelector("#phone").value = phoneNumber;
  const nameOfPerson = document.querySelector("#person-name").value;
  const phone = phoneNumber;
  const placeName = document.querySelector("#location-name").value;
  const vaccine = document.querySelector("#vaccine-name").value;
  const fee = document.querySelector("#fees").value;
  const address = document.querySelector("#address").value;
  const pincode = document.querySelector("#pincode").value;
  const available_capacity_dose1 = document.querySelector("#dose1").value;
  const available_capacity_dose2 = document.querySelector("#dose2").value;
  const startTime = document.querySelector("#start-time").value;
  const endTime = document.querySelector("#end-time").value;

  const givenDate = document.querySelector("#date");
  const dateInput = givenDate.value;
  const year = dateInput.slice(0, 4);
  const month = dateInput.slice(5, 7);
  const date = dateInput.slice(8, 10);

  //final date in dd-mm-yyyy
  const dateFinal = date + "-" + month + "-" + year;

  fetch("https://dabjab.herokuapp.com/postdata", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      nameOfPerson: nameOfPerson,
      phoneNo: phone,
      placeName: placeName,
      vaccine: vaccine,
      fee: fee,
      address: address,
      pincode: pincode,
      available_capacity_dose1: available_capacity_dose1,
      available_capacity_dose2: available_capacity_dose2,
      startTime: startTime,
      endTime: endTime,
      date: dateFinal,
    }),
  }).then((response) => {
    console.log(response);
    document.querySelector("h3").innerHTML = "Thanks For Registering!";
    loader.style.display = "none";
    content.style.display = "block"
  });
});
