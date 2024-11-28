import { data } from "./data.js";
console.log(data);

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

const getLoggedInUser = () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser === null) {
    window.location.href = "./pages/login.html";
  } else {
    return loggedInUser;
  }
};

document.addEventListener("click", (e) => {
  if (!profileIcon.contains(e.target)) {
    headerDropdown.classList.remove("header__dropdown--show");
  }
});
const currentUser = JSON.parse(getLoggedInUser());
welcomeSign.innerText = `Welcome, ${currentUser.first_name}`;
welcomeText.innerText = `Indulge in Excellence, Redefined`;
previewText.innerText = `Choose your indulgence`;

const createPreview = () => {
  const origin = window.location.origin;
  data.productCategories.forEach((category) => {
    const previewGroup = document.createElement("div");
    previewGroup.classList.add("preview__group");
    previewOptions.append(previewGroup);

    const previewImage = document.createElement("img");
    previewImage.src = category.preview;
    previewImage.alt = category.category;
    previewImage.classList.add("preview__image");
    domElemets.previewImage = document.querySelector(".preview__image");

    const previewTitle = document.createElement("h2");
    previewTitle.innerText = category.name;
    previewTitle.classList.add("preview__title");
    previewGroup.append(previewImage, previewTitle);
    previewGroup.addEventListener("click", () => {
      window.location.href = `${origin}/pages${category.link}`;
    });
  });
};
createPreview();
