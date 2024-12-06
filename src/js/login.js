import { getData, storeData, checkLoggedInUser } from "./utils.js";

const cachedElelements = {
  form: document.querySelector(".login-form"),
  register: document.querySelector(".login-form__button--register"),
  buttonContainer: document.querySelector(".login-form__button-container"),
  messages: document.querySelector(".login-form__messages"),
};

const { form, register, messages } = cachedElelements;
let loginAttempted = false;

window.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", loginUser);
  register.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "./register.html";
  });
});

const loginUser = (event) => {
  event.preventDefault();
  const users = getData("users");
  let email;
  let password;

  for (let element of event.target.elements) {
    if (element.name && element.tagName.toLowerCase() === "input") {
      if (element.name === "email") {
        email = element.value;
      }
      if (element.name === "password") {
        password = element.value;
      }
    }
  }

  let userAuthenticated = false;

  if (users.length > 0) {
    users.some((user) => {
      if (user.email === email && user.password === password) {
        user.loggedIn = true;
        userAuthenticated = true;
        storeData(users);
        return true;
      }
    });
  }

  if (userAuthenticated) {
    redirectUser();
  } else if (!loginAttempted) {
    loginAttempted = true;

    const error = document.createElement("p");
    error.textContent = "Invalid username or password";
    error.classList.add("login-form__error");
    messages.append(error);
  }
};


const redirectUser = () => {
  if (checkLoggedInUser()) {
    window.location.href = "../index.html";
  }
};
