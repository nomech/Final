//Imports utility functions
import { getData, storeData, checkLoggedInUser } from "./utils.js";

// Cached DOM elements
const cachedElelements = {
  form: document.querySelector(".login-form"),
  register: document.querySelector(".login-form__button--register"),
  buttonContainer: document.querySelector(".login-form__button-container"),
  messages: document.querySelector(".login-form__messages"),
};

// Destructured DOM Elements
const { form, register, messages } = cachedElelements;

let userAuthenticated = false;
let loginAttempted = false;

//Ensures that the page is fully loaded before running the script
window.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", loginUser);
  register.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "./register.html";
  });
});

// Function that logs in the user
const loginUser = (event) => {
  //Prevents the default form submission
  event.preventDefault();

  //Gets the users from the local storage
  const users = getData("users");
  let email;
  let password;

  //Iterates through the form elements to get the email and password
  for (let element of event.target.elements) {
    //Checks if the element is an input field
    if (element.name && element.tagName.toLowerCase() === "input") {
      //Gets the email and password
      if (element.name === "email") {
        email = element.value;
      }
      if (element.name === "password") {
        password = element.value;
      }
    }
  }

  //Checks if the users array is empty or not
  if (users.length > 0) {
    //Iterates through the users array to check if the user exists
    users.some((user) => {
      if (user.email === email && user.password === password) {
        user.loggedIn = true;
        userAuthenticated = true;
        storeData(users);
        return true;
      }
    });
  }

  //Checks if the user is authenticated
  if (userAuthenticated) {
    //Redirects the user to the home page
    redirectUser();
  } else if (!loginAttempted) {
    //Displays an error message if the user is not authenticated
    loginAttempted = true;

    const error = document.createElement("p");
    error.textContent = "Invalid username or password";
    error.classList.add("login-form__error");
    messages.append(error);
  }
};

// Function that redirects the user to the home page if they are logged in
const redirectUser = () => {
  if (checkLoggedInUser()) {
    window.location.href = "../index.html";
  }
};
