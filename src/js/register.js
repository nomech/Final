//Imports utility functions
import { getData, storeData } from "./utils.js";

// Cached DOM elements
const cachedElements = {
  form: document.querySelector(".register-form"),
  valid: document.querySelector(".register-form__validity--valid"),
  error: document.querySelector(".register-form__validity--error"),
  registerButton: document.querySelector(".register-form__button"),
};

// Destructured DOM Elements
const { form, valid, error, registerButton } = cachedElements;

//Gets the users from the local storage
let userList = getData("users");

//Ensures that the page is fully loaded before running the script
window.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", registerUser);

  document.addEventListener("input", (event) => {
    if (event.target.classList.contains("register-form__email")) {
      checkEmail(event);
    }
  });
});

// Function that checks if the email is already registered
const checkEmail = (event) => {
  //Gets the users from the local storage
  if (userList.length > 0) {
    const inputValue = event.target.value.toLowerCase().trim();
    const emailCheck = userList.some((user) => inputValue === user.email);

    //Checks if the email is already registered
    if (emailCheck) {
      valid.classList.remove("register-form__validity--show");
      error.classList.add("register-form__validity--show");
      registerButton.classList.add("button--disabled");
    } else if (!emailCheck) {
      error.classList.remove("register-form__validity--show");
      valid.classList.add("register-form__validity--show");
      registerButton.classList.remove("button--disabled");
    }
  }
};

// Function that registers the user
const registerUser = (event) => {
  //Prevents the default form submission
  event.preventDefault();

  //Creates a new user object
  const user = {
    id: Date.now(),
    loggedIn: false,
  };

  let password;
  let confirmPassword;

  //Iterates through the form elements to get the user details
  for (let element of event.target.elements) {
    //Checjks if the element name is password or confirm_password and assigns the value to the respective variable
    if (element.name === "password") {
      password = element.value;
    }
    if (element.name === "confirm_password") {
      confirmPassword = element.value;
    }

    //Checks if the element is an input field
    if (element.name && element.tagName.toLowerCase() === "input") {
      if (element.name === "email") {
        user[element.name] = element.value.toLowerCase().trim();
      } else {
        user[element.name] = element.value;
      }
    }
  }

  //Checks if the password and confirm password match
  if (user.password === user.confirm_password) {
    //Checks if the users array is empty and adds the user to the array, if not, it creates a new array and adds the user
    if (userList.length > 0) {
      //Adds the user to the users array
      userList = [...userList, user];

      //Stores the users array in the local storage
      storeData(userList);
      //Redirects the user to the login page
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
