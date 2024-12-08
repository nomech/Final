import { data } from "./data.js";
import { updateCartAmount, getLoggedInUser, getData } from "./utils.js";

const domElemets = {
  headerDropdown: document.querySelector(".header__dropdown"),
  profileIcon: document.querySelector(".header__profile-icon"),
  profileName: document.querySelector(".header__profile-name"),
  headerList: document.querySelector(".header__list"),
  dropdownList: document.querySelector(".header__dropdown-list"),
};

const { headerDropdown, profileIcon, headerList, dropdownList } = domElemets;

const currentUser = JSON.parse(getLoggedInUser());

window.addEventListener("DOMContentLoaded", () => {
  createNavLinks();
  createDropdownItem();

  const logOutButton = domElemets["LogOut"];
  profileIcon.addEventListener("click", toggleDropdown);
  logOutButton.addEventListener("click", (event) => logOut());

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("header__dropdown-item")) {
      window.location.href = getPageUrl(event.target.dataset.id);
    } else if (!profileIcon.contains(event.target)) {
      headerDropdown.classList.remove("header__dropdown--show");
    }
  });
});

const getPageUrl = (link) => {
  const origin = window.location.origin;
  const basePath =
    window.location.hostname === "127.0.0.1" ? "/src/pages" : "/pages";
  return `${origin}${basePath}${link}`;
};

const logOut = () => {
  const users = getData("users");
  users.forEach((user) => {
    if (currentUser.id === user.id) {
      user.loggedIn = false;
    }
  });

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.removeItem("loggedInUser");
};

const toggleDropdown = () => {
  headerDropdown.classList.toggle("header__dropdown--show");
};

const createNavLinks = () => {
  data.productCategories.forEach((category) => {
    const navLink = document.createElement("a");
    navLink.innerText = category.name;
    navLink.href = getPageUrl(category.link);
    navLink.classList.add("header__list-item");
    headerList.append(navLink);
  });
};

const createDropdownItem = () => {
  data.userActions.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.dataset.id = item.link;
    listItem.classList.add(
      "header__dropdown-item",
      `header__dropdown-item--${item.name.replace(" ", "").toLowerCase()}`
    );
    listItem.innerHTML = item.icon;

    domElemets[item.name.replace(" ", "")] = listItem;

    const listLink = document.createElement("p");
    listLink.classList.add("header__dropdown-link");
    if (item.name === "Cart") {
      const cartCounter = document.createElement("p");
      cartCounter.classList.add("header__dropdown-counter");
      cartCounter.innerText = `(${updateCartAmount()})`;
      listItem.append(cartCounter);
    }
    listLink.innerText = `${item.name}`;

    listItem.append(listLink);
    dropdownList.append(listItem);
  });
};
