import { data } from "./data.js";
import { getLoggedInUser } from "./utils.js";

const domElemets = {
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

const {
  headerDropdown,
  profileIcon,
  welcomeSign,
  welcomeText,
  previewText,
  previewOptions,
  contactButton,
  contactMessage,
} = domElemets;

window.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(getLoggedInUser());
  welcomeSign.innerText = `Welcome, ${currentUser.first_name}`;
  welcomeText.innerText = `Indulge in Excellence, Redefined`;
  previewText.innerText = `Choose your indulgence`;
  createPreview();

  document.addEventListener("click", (event) => {
    if (!profileIcon.contains(event.target)) {
      headerDropdown.classList.remove("header__dropdown--show");
    }

    if (event.target.classList.contains("contact__button")) {
      sendMessage(currentUser);
    }
  });
});

const createPreview = () => {
  const origin = window.location.origin;
  data.productCategories.forEach((category) => {
    const previewGroup = document.createElement("div");
    previewGroup.classList.add("preview__group");
    previewOptions.append(previewGroup);

    const previewImage = document.createElement("img");
    previewImage.src = category.preview;
    previewImage.alt = `${category.name} preview image`;
    previewImage.classList.add("preview__image");

    const previewTitle = document.createElement("h2");
    previewTitle.innerText = category.name;
    previewTitle.classList.add("preview__title");
    previewGroup.append(previewImage, previewTitle);

    previewGroup.addEventListener("click", () => {
      if (window.location.hostname === "127.0.0.1") {
        window.location.href = `${origin}/src/pages${category.link}`;
      } else {
        window.location.href = `${origin}/pages${category.link}`;
      }
    });
  });
};

const sendMessage = (user) => {
  if (contactMessage.value.length > 0) {
    const newMessage = contactMessage.value;
    const email = user.email;
    const messages = localStorage.getItem("message");
    const time = new Date().toLocaleString();
    if (messages) {
      const parsedMessages = JSON.parse(messages);
      localStorage.setItem(
        "message",
        JSON.stringify([...parsedMessages, { time, email, newMessage }])
      );
    } else {
      localStorage.setItem(
        "message",
        JSON.stringify([{ time, email, newMessage }])
      );
    }
    contactMessage.value = "";
    contactButton.innerText = "Message Sent!";
    contactButton.disabled = true;
    contactButton.classList.add("button--disabled");

    setTimeout(() => {
      contactButton.innerText = "Send Message";
      contactButton.disabled = false;
      contactButton.classList.remove("button--disabled");
    }, 1500);
  }
};
