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
};

const {
  headerDropdown,
  profileIcon,
  welcomeSign,
  welcomeText,
  previewText,
  previewOptions,
} = domElemets;

window.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(getLoggedInUser());
  welcomeSign.innerText = `Welcome, ${currentUser.first_name}`;
  welcomeText.innerText = `Indulge in Excellence, Redefined`;
  previewText.innerText = `Choose your indulgence`;
  createPreview();

  document.addEventListener("click", (e) => {
    if (!profileIcon.contains(e.target)) {
      headerDropdown.classList.remove("header__dropdown--show");
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
    domElemets.previewImage = document.querySelector(".preview__image");

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
