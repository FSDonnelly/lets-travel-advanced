let signInForm = document.querySelector(".sign-in-form");
let registerForm = document.querySelector(".register-form");

signInForm.addEventListener("submit", e => {
  e.preventDefault();
  let email = document.getElementById("sign-in-email").value;
  let password = document.getElementById("sign-in-password").value;

  fetch(`http://localhost:3000/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.text())
    .then(data => alert(data));
});

registerForm.addEventListener("submit", e => {
  e.preventDefault();
  let email = document.getElementById("register-email").value;
  let password = document.getElementById("confirm-register-password").value;
  let createPassword = document.getElementById("create-register-password")
    .value;

  if (password !== createPassword) {
    return alert("Passwords do not match");
  }

  fetch(`http://localhost:3000/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.text())
    .then(data => alert(data));
});
