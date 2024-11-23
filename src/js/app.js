import { data } from "./data.js";

const domElemets = {
  headerDropdown: document.querySelector(".header__dropdown"),
  profileIcon: document.querySelector(".header__profile-icon"),
  profileName: document.querySelector(".header__profile-name"),
  headerList: document.querySelector(".header__list"),
  dropdownList: document.querySelector(".header__dropdown-list"),
  welcomeSign: document.querySelector(".welcome__sign"),
  welcomeText: document.querySelector(".welcome__text"),
};

const { headerDropdown, profileIcon, headerList, dropdownList, welcomeSign, welcomeText } =
  domElemets;

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

const logOut = () => {
  const users = JSON.parse(getUsers());
  users.forEach((user) => {
    if (currentUser.id === user.id) {
      user.loggedIn = false;
    }
  });

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.removeItem("loggedInUser");
  console.log(localStorage);
  window.location.href = "./pages/login.html";
};

const toggleDropdown = () => {
  headerDropdown.classList.toggle("header__dropdown--show");
};

//  profileName.innerText = `${currentUser.first_name}`;

document.addEventListener("click", (e) => {
  if (!profileIcon.contains(e.target)) {
    headerDropdown.classList.remove("header__dropdown--show");
  }
});

const createNavLinks = () => {
  data.categories.forEach((category) => {
    const navLink = document.createElement("a");
    navLink.innerText = category.category;
    navLink.classList.add("header__list-item");
    domElemets.headerListItem = document.querySelectorAll(".header__list-item");
    headerList.append(navLink);
  });
};

const createDropdownItem = () => {
  data.dropdown.forEach((item) => {
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
    listItem.append(listLink);
    dropdownList.append(listItem);
  });
};

createNavLinks();

createDropdownItem();

const logOutButton = document.querySelector(".header__dropdown-item--logout");
const currentUser = JSON.parse(getLoggedInUser());
profileIcon.addEventListener("click", toggleDropdown);

logOutButton.addEventListener("click", logOut);
welcomeSign.innerText = `Welcome, ${currentUser.first_name}`;
welcomeText.innerText = `Indulge in Excellence, Redefined`;
