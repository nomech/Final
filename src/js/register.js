import { getData, storeData } from "./utils.js";

const cachedElements = {
  form: document.querySelector(".register-form"),
  email: document.querySelector(".register-form__email"),
};

const { form, email } = cachedElements;

window.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", registerUser);

  document.addEventListener("input", (event) => {
    if (event.target.classList.contains("register-form__email")) {
      checkEmail(event);
    }
  });
});

const checkEmail = (event) => {
  const registeredUsers = getData("users");
  const inputValue = event.target.value.toLowerCase().trim();
  const test = registeredUsers.some((user) => inputValue === user.email);
  if(test) {
    email.setCustomValidity("This email is already registered");
  }
};

const registerUser = (event) => {
  event.preventDefault();
  const userList = getData("users");
  const user = { id: Date.now(), loggedIn: false };

  let password;
  let confirmPassword;

  for (let element of event.target.elements) {
    if (element.name === "password") {
      password = element.value;
    }
    if (element.name === "confirm_password") {
      confirmPassword = element.value;
    }

    if (element.name && element.tagName.toLowerCase() === "input") {
      if (element.name === "email") {
        user[element.name] = element.value.toLowerCase().trim();
      } else {
        user[element.name] = element.value;
      }
    }
  }

  if (user.password === user.confirm_password) {
    userList.push(user);
    storeData(userList);
    window.location.href = "./login.html";
  } else {
    console.error(
      `You need to enter the same password in both "Password" and "Confirm Password"`
    );
  }
};
