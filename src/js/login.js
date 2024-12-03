import { getData, storeData } from "./utils.js";

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
  register.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "./register.html";
  });
});



const loginUser = (e) => {
  e.preventDefault();

  const users = getData("users");
  let email;
  let password;

  for (let element of e.target.elements) {
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

const checkLoggedInUser = () => {
  let loginStatus = false;
  const findLoggedInUser = getData("users").find((user) => user.loggedIn);
  
  if (findLoggedInUser) {
    const loggedInUser = {
      id: findLoggedInUser.id,
      first_name: findLoggedInUser.first_name,
      last_name: findLoggedInUser.last_name,
      email: findLoggedInUser.email,
    };
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    loginStatus = findLoggedInUser.loggedIn;
  }

  return loginStatus;
};

const redirectUser = () => {
  if (checkLoggedInUser()) {
    window.location.href = "../index.html";
  }
};
