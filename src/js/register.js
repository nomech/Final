import { getData, storeData } from "./utils.js";

const cachedElements = {
  form: document.querySelector(".register-form"),
  valid: document.querySelector(".register-form__validity--valid"),
  error: document.querySelector(".register-form__validity--error"),
  registerButton: document.querySelector(".register-form__button"),
};

const { form, valid, error, registerButton } = cachedElements;
let userList = getData("users");

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
  if (registeredUsers.length > 0) {
    const inputValue = event.target.value.toLowerCase().trim();
    const emailCheck = registeredUsers.some(
      (user) => inputValue === user.email
    );
    if (emailCheck) {
      valid.classList.remove("register-form__validity--show");
      error.classList.add("register-form__validity--show");
      registerButton.classList.add("button--disabled");
    } else if (!emailCheck) {
      error.classList.remove("register-form__validity--show");
      valid.classList.toggle("register-form__validity--show");
      registerButton.classList.remove("button--disabled");
    }
  }
};

const registerUser = (event) => {
  const user = {
    id: Date.now(),
    loggedIn: false,
  };

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
    if (userList.length > 0) {
      userList = [...userList, user];
      storeData(userList);
      window.location.href = "./login.html";
    } else {
      userList = [user];
      storeData(userList);
      window.location.href = "./login.html";
    }
  } else {
    console.error(
      `You need to enter the same password in both "Password" and "Confirm Password"`
    );
  }
};
