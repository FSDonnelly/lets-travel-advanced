let signInForm = document.querySelector(".sign-in-form");
let registerForm = document.querySelector(".register-form");

signInForm.addEventListener("submit", e => {
  e.preventDefault();
  let email = document.getElementById("sign-in-email").value;
  let password = document.getElementById("sign-in-password").value;

  fetch(`/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => {
      if (res.status === 400) {
        throw new Error();
      }
      return res.json();
    })
    .then(data => {
      window.location.href = data.redirectURL;
    })
    .catch(() => alert("Wrong email or password"));
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

  fetch(`/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.text())
    .then(data => alert(data));
});
