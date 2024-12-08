import {
  getLoggedInUser,
  getData,
  storeData,
  checkLoggedInUser,
} from "./utils.js";

let loggedInUser = JSON.parse(getLoggedInUser());
const inputName = document.querySelectorAll(".profile-form__input");
const editButton = document.querySelector(".profile__edit-button");
const saveButton = document.querySelector(".profile__save-button");
const confirmPasswordLabel = document.querySelector(
  ".profile-form__label--password"
);
const confirmPasswordInput = document.querySelector(
  ".profile-form__confirm-password"
);

window.addEventListener("DOMContentLoaded", () => {
  addUserDataToForm();
});

document.addEventListener("click", (event) => {
  const classList = event.target.classList;
  if (classList.contains("profile__edit-button")) {
    editForm();
  } else if (classList.contains("profile__save-button")) {
    saveForm();
  }
});

const addUserDataToForm = () => {
  for (let element of inputName) {
    element.value = loggedInUser[element.name]
      ? loggedInUser[element.name]
      : "";
  }
};

const editForm = () => {
  for (let element of inputName) {
    element.classList.remove("profile-form__input--readonly");
    element.removeAttribute("readonly");
  }
  editButton.classList.add("profile-form__button--hide");
  saveButton.classList.remove("profile-form__button--hide");
  console.log(confirmPasswordLabel.classList);
  confirmPasswordLabel.classList.remove("profile-form__label-confirm--hide");
  confirmPasswordInput.classList.remove("profile-form__confirm-password--hide");
};

const lockForm = () => {
  for (let element of inputName) {
    element.classList.add("profile-form__input--readonly");
    element.setAttribute("readonly", true);
  }

  saveButton.classList.add("button--disabled");
  confirmPasswordLabel.classList.add("profile-form__label-confirm--hide");
  confirmPasswordInput.classList.add("profile-form__confirm-password--hide");
  saveButton.innerHTML = "Saved!";
  setTimeout(() => {
    editButton.classList.remove("profile-form__button--hide");
    saveButton.classList.add("profile-form__button--hide");
    saveButton.classList.remove("button--disabled");

    saveButton.innerHTML = "Save";
  }, 1000);
};

const saveForm = () => {
  const users = getData("users");
  const currentUser = users.find((user) => user.id === loggedInUser.id);
  let updatedUser = {};

  for (let element of inputName) {
    if (element.name === "password" || element.name === "confirm_password") {
      if (element.value.length > 0) {
        updatedUser[element.name] = element.value;
      }
    } else {
      updatedUser[element.name] = element.value;
    }
  }

  updatedUser = { ...currentUser, ...updatedUser };

  const updatedUsers = users.map((user) => {
    if (user.id === loggedInUser.id) {
      return updatedUser;
    } else {
      return user;
    }
  });

  if (updatedUser.password !== updatedUser.confirm_password) {
    return;
  }

  storeData(updatedUsers);
  checkLoggedInUser();
  loggedInUser = JSON.parse(getLoggedInUser());
  addUserDataToForm();
  lockForm();
};
