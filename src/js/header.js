import { data } from "./data.js";
import { updateCartAmount, getLoggedInUser  , getUsers } from "./utils.js";

const domElemets = {
  headerDropdown: document.querySelector(".header__dropdown"),
  profileIcon: document.querySelector(".header__profile-icon"),
  profileName: document.querySelector(".header__profile-name"),
  headerList: document.querySelector(".header__list"),
  dropdownList: document.querySelector(".header__dropdown-list"),
};

const { headerDropdown, profileIcon, headerList, dropdownList } = domElemets;

const redirect = (link) => {
  window.location.href = getPageUrl(link);
};

const getPageUrl = (link) => {
  const origin = window.location.origin;
  const basePath =
    window.location.hostname === "127.0.0.1" ? "/src/pages" : "/pages";
  return `${origin}${basePath}${link}`;
};

const logOut = (e) => {
  const users = JSON.parse(getUsers());
  users.forEach((user) => {
    if (currentUser.id === user.id) {
      user.loggedIn = false;
    }
  });

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.removeItem("loggedInUser");
  const id = e.target.dataset.id;
  window.location.href = data.userActions[id].link;
};

const toggleDropdown = () => {
  headerDropdown.classList.toggle("header__dropdown--show");
};

document.addEventListener("click", (e) => {
  if (!profileIcon.contains(e.target)) {
    headerDropdown.classList.remove("header__dropdown--show");
  }
});

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
    listItem.dataset.id = item.link.toLowerCase();
    listItem.classList.add(
      "header__dropdown-item",
      `header__dropdown-item--${item.name.replace(" ", "").toLowerCase()}`
    );
    listItem.innerHTML = item.icon;

    domElemets["headerDropdownItem" + item.name.replace(" ", "")] = listItem;

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

const currentUser = JSON.parse(getLoggedInUser());

window.addEventListener("DOMContentLoaded", () => {
  createNavLinks();
  createDropdownItem();
  const logOutButton = document.querySelector(".header__dropdown-item--logout");

  profileIcon.addEventListener("click", toggleDropdown);

  logOutButton.addEventListener("click", (e) => logOut(e));
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("header__dropdown-item")) {
      redirect(e.target.dataset.id);
    }
  });
});
