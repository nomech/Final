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

window.addEventListener("DOMContentLoaded", () => {
  addUserDataToForm();
});

document.addEventListener("click", (event) => {
  const classList = event.target.classList;
  if (classList.contains("profile__edit-button")) {
    editForm();
  } else if (classList.contains("profile__save-button")) {
    saveForm();
  } else if (classList.contains("profile-form__button--password")) {
    changePassword();
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
    //https://stackoverflow.com/questions/21609012/disable-readonly-to-text-box-onclicking-the-button
    element.removeAttribute("readonly");
  }
  editButton.classList.add("profile-form__button--hide");
  saveButton.classList.remove("profile-form__button--hide");
};

const lockForm = () => {
  for (let element of inputName) {
    element.classList.add("profile-form__input--readonly");
    element.setAttribute("readonly", true);
  }

  saveButton.classList.add("button--disabled");
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
    updatedUser[element.name] = element.value;
  }

  updatedUser = { ...currentUser, ...updatedUser };

  const updatedUsers = users.map((user) => {
    if (user.id === loggedInUser.id) {
      return updatedUser;
    } else {
      return user;
    }
  });

  //check if password and password confirm match
  if (updatedUser.password !== updatedUser.confirm_password) {
    alert("Passwords do not match");
    return;
  }

  console.log(updatedUsers)
  storeData(updatedUsers);
  checkLoggedInUser();
  loggedInUser = JSON.parse(getLoggedInUser());
  addUserDataToForm();
  lockForm();
};

//todo: add event listener to the save button
