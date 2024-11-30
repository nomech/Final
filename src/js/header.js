import { data } from "./data.js";

const domElemets = {
  headerDropdown: document.querySelector(".header__dropdown"),
  profileIcon: document.querySelector(".header__profile-icon"),
  profileName: document.querySelector(".header__profile-name"),
  headerList: document.querySelector(".header__list"),
  dropdownList: document.querySelector(".header__dropdown-list"),
};

const { headerDropdown, profileIcon, headerList, dropdownList } = domElemets;

const getLoggedInUser = () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser === null) {
    window.location.href = "./pages/login.html";
  } else {
    return loggedInUser;
  }
};

const getUsers = () => {
  const users = localStorage.getItem("users");
  return users;
};

const getCartAmount = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const cartAmount = cart.length;
  const cartAmountElement = document.querySelector(".header__profile-counter");
  if (cartAmount > 0) {
    cartAmountElement.classList.add("header__profile-counter--show");
    cartAmountElement.innerText = cartAmount;
  }
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
  const id = e.targer.dataset.id;
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
  const origin = window.location.origin;
  data.productCategories.forEach((category) => {
    const navLink = document.createElement("a");
    navLink.innerText = category.name;
    navLink.href = `${origin}/pages${category.link}`;
    console.log(window.location.hostname);
    if (window.location.hostname === "127.0.0.1") {
      navLink.href = `${origin}/src/pages${category.link}`;
    }
    navLink.classList.add("header__list-item");
    domElemets.headerListItem = document.querySelectorAll(".header__list-item");
    headerList.append(navLink);
  });

  getCartAmount();
};

const createDropdownItem = () => {
  data.userActions.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.classList.add(
      "header__dropdown-item",
      `header__dropdown-item--${item.name.replace(" ", "").toLowerCase()}`
    );
    listItem.innerHTML = item.icon;

    domElemets[
      "headerDropdownItem" + item.name.replace(" ", "")
    ] = `header__dropdown-item--${item.name.replace(" ", "").toLowerCase()}`;

    const listLink = document.createElement("a");
    listLink.classList.add("header__dropdown-link");
    listLink.innerText = item.name;
    listLink.href = item.link;
    listLink.dataset.id = item.id;
    listItem.append(listLink);
    dropdownList.append(listItem);
  });
};

createNavLinks();
createDropdownItem();

const logOutButton = document.querySelector(".header__dropdown-item--logout");
const currentUser = JSON.parse(getLoggedInUser());
profileIcon.addEventListener("click", toggleDropdown);
logOutButton.addEventListener("click", (e) => logOut());
