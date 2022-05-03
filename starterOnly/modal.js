// show or hide navigation menu by changing the classes
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// show or hide burger menu
document.getElementById("burger-menu").addEventListener("click", editNav);

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
document.getElementsByClassName("close")[0].addEventListener("click", closeModal);

// close modal form
function closeModal() {
  modalbg.style.display = "none";
  form.style.display = "block";
  signupConfirmation.style.display = "none";
}

// form DOM elements for form validation
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const numberOfTournaments = document.getElementById("numberOfTournaments");
const locationContainer = document.getElementById("locationContainer");
const conditions = document.getElementById("conditions");

const form = document.getElementById("signup-form");
const signupConfirmation = document.getElementById("signup-confirmation");

// display an error message
function showErrorMessage(element, message) {
  element.nextElementSibling.textContent = message;
  element.className = 'text-control invalid';
}

// clear the error message
function clearErrorMessage(element) {
  element.nextElementSibling.textContent = '';
  element.className = 'text-control';
}

// check firstname field
function checkFirstName() {
  let valid = false;
  if(fname.value.length >= 2) {
    clearErrorMessage(fname);
    valid = true;
  } else {
    showErrorMessage(fname, "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
  }
  return valid;
}

// check firstname field
function checkLastName() {
  let valid = false;
  if(lname.value.length >= 2) {
    clearErrorMessage(lname);
    valid = true;
  } else {
    showErrorMessage(lname, "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
  }
  return valid;
}

// check email field for correct format
function checkEmail() {
  let valid = false;
  // email regular expression
  const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (emailRegExp.test(email.value)) {
    clearErrorMessage(email);
    valid = true;
  } else {
    showErrorMessage(email, "Veuillez entrer une adresse email valide.");
  }
  return valid;
}

// check a birthdate has been provided
function checkBirthdate() {
  let valid = false;
  if (birthdate.value) {
    clearErrorMessage(birthdate);
    valid = true;
  } else {
    showErrorMessage(birthdate, "Vous devez entrer votre date de naissance.");
  }
  return valid;
}

// check a number of tournaments has been provided
function checkNumberOfTournaments() {
  let valid = false;
  if (numberOfTournaments.value) {
    clearErrorMessage(numberOfTournaments);
    valid = true;
  } else {
    showErrorMessage(numberOfTournaments, "Vous devez entrer un nombre.");
  }
  return valid;
}

// check a location has been selected
function checkLocation() {
  let valid = false;
  if (document.querySelector('input[name="location"]:checked')) {
    locationContainer.nextElementSibling.textContent = "";
    valid = true;
  } else {
    locationContainer.nextElementSibling.textContent = "Vous devez choisir un tournoi.";
  }
  return valid;
}

// check the conditions have been accepted
function checkConditions() {
  let valid = false;
  if (document.getElementById("checkbox1").checked) {
    conditions.nextElementSibling.textContent = "";
    valid = true;
  } else {
    conditions.nextElementSibling.textContent = "Vous devez accepter les conditions d'utilisation.";
  }
  return valid;
}

// delay the execution of the validation functions to improve form perfomance and prevent from sending error messages immediately to the user
const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
      // cancel the previous timer
      if (timeoutId) {
          clearTimeout(timeoutId);
      }
      // setup a new timer
      timeoutId = setTimeout(() => {
          fn.apply(null, args)
      }, delay);
  };
};

// event listeners on individual form fields
fname.addEventListener('input', debounce(checkFirstName));
lname.addEventListener('input', debounce(checkLastName));
email.addEventListener('input', debounce(checkEmail));
birthdate.addEventListener('input', debounce(checkBirthdate));
numberOfTournaments.addEventListener('input', debounce(checkNumberOfTournaments));
locationContainer.addEventListener('input', checkLocation);
document.getElementById("checkbox1").addEventListener('input', checkConditions);  


// event listener on submit button to validate all fields and submit form or prevent submission 
form.addEventListener('submit', function (e) {
  // prevent the form from submitting
  e.preventDefault();

  // call each individual function to validate the form fields
  let isFirstNameValid = checkFirstName(),
      isLastNameValid = checkLastName(),
      isEmailValid = checkEmail(),
      isBirthdateValid = checkBirthdate(),
      isNumberOfTournamentsValid = checkNumberOfTournaments()
      isLocationValid = checkLocation(),
      isConditionsValid = checkConditions();

  // determine if the form is valid. The form is valid only if all fields are valid.    
  let isFormValid = isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isBirthdateValid &&
      isNumberOfTournamentsValid &&
      isLocationValid &&
      isConditionsValid;

  // submit to the server if the form is valid. For this exercise: we'll simply clear the form fields, hide the signup form and show a confirmation message
  if (isFormValid) {
    // clear form fields
    fname.value = "";
    lname.value = "";
    email.value = "";
    birthdate.value = "";
    numberOfTournaments.value = "";
    document.querySelector('input[name="location"]:checked').checked = false;
    document.getElementById("checkbox2").checked = false;
    
    // hide signup form
    form.style.display = "none";
    
    // display confirmation message
    signupConfirmation.style.display = "block";
  }
});

