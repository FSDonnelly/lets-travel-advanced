let signInForm = document.querySelector(".sign-in-form");
let registerForm = document.querySelector(".register-form");

signInForm.addEventListener("click", e => {
  e.preventDefault();
  let email = document.getElementById("sign-in-email").value;
  let password = document.getElementById("sign-in-password").value;
});

registerForm.addEventListener("click", e => {
  e.preventDefault();
  let email = document.getElementById("register-email").value;
  let confirmPassword = document.getElementById("confirm-register-password")
    .value;
  let createPassword = document.getElementById("create-register-password")
    .value;
});
