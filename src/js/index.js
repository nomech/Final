//Imports data and utility functions
import { data } from "./data.js";
import { getLoggedInUser } from "./utils.js";

// Cached DOM elements
const cachedElelements = {
  headerDropdown: document.querySelector(".header__dropdown"),
  profileIcon: document.querySelector(".header__profile-icon"),
  profileName: document.querySelector(".header__profile-name"),
  welcomeSign: document.querySelector(".welcome__sign"),
  welcomeText: document.querySelector(".welcome__text"),
  preview: document.querySelector(".preview"),
  previewText: document.querySelector(".preview__text"),
  previewOptions: document.querySelector(".preview__options"),
  contactButton: document.querySelector(".contact__button"),
  contactMessage: document.querySelector(".contact__message"),
};

// Destructured DOM Elements
const {
  welcomeSign,
  welcomeText,
  previewText,
  previewOptions,
  contactButton,
  contactMessage,
} = cachedElelements;
const currentUser = JSON.parse(getLoggedInUser());

//Ensures that the page is fully loaded before running the script
window.addEventListener("DOMContentLoaded", () => {
  createWelcome();
  createPreview();

  //Delegate event listener to the document for the contact button
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("contact__button")) {
      event.preventDefault();
      sendMessage(currentUser);
    }
  });
});

// Function that creates the welcome messages
const createWelcome = () => {
  //Displays the user's name in the header and welcome messages
  welcomeSign.innerText = `Welcome, ${currentUser.first_name}`;
  welcomeText.innerText = `Indulge in Excellence, Redefined`;
  previewText.innerText = `Choose your indulgence`;
};

// Function that creates the preview options
const createPreview = () => {
  //Prepae the origin for the redirect
  const origin = window.location.origin;
  
  //Iterates through the product categories and creates the preview options
  data.productCategories.forEach((category) => {
    //Creates the preview group
    const previewGroup = document.createElement("div");
    previewGroup.classList.add("preview__group");
    previewOptions.append(previewGroup);

    //Creates the preview image and title
    const previewImage = document.createElement("img");
    previewImage.src = category.preview;
    previewImage.alt = `${category.name} preview image`;
    previewImage.classList.add("preview__image");

    //Creates the preview title
    const previewTitle = document.createElement("h2");
    previewTitle.innerText = category.name;
    previewTitle.classList.add("preview__title");
    previewGroup.append(previewImage, previewTitle);

    //Creates the preview button
    previewGroup.addEventListener("click", () => {
      //If the page is being run locally, redirect to the local pages and if not, redirect to the live pages
      if (window.location.hostname === "127.0.0.1") {
        window.location.href = `${origin}/src/pages${category.link}`;
      } else {
        window.location.href = `${origin}/pages${category.link}`;
      }
    });
  });
};

// Function that stores messages in local storage when submitted
const sendMessage = (user) => {
  //Checks if the message input is not empty
  if (contactMessage.value.length > 0) {
    //Retrieves the message, email and time
    const message = contactMessage.value;
    const email = user.email;
    const messages = localStorage.getItem("message");
    const time = new Date().toLocaleString();

    //Stores the message in local storage
    if (messages) {
      const parsedMessages = JSON.parse(messages);
      localStorage.setItem("message", JSON.stringify([...parsedMessages, { time, email, message }]));
    } else {
      localStorage.setItem("message", JSON.stringify([{ time, email, message }]));
    }
    //Clears the message input and updates the button text
    contactMessage.value = "";
    contactButton.innerText = "Message Sent!";
    contactButton.disabled = true;
    contactButton.classList.add("button--disabled");

    //Resets the button text and enables the button after 1 second
    setTimeout(() => {
      contactButton.innerText = "Send Message";
      contactButton.disabled = false;
      contactButton.classList.remove("button--disabled");
    }, 1000);
  }
};
