import { data } from "./data.js";

const getLoggedInUser = () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser === null) {
    window.location.href = "./pages/login.html";
  } else {
    return loggedInUser;
  }
};

getLoggedInUser();

const getUser = () => {
  const users = localStorage.getItem("users");
  console.log(users);
  return users;
};

const currentUser = JSON.parse(getLoggedInUser());

const logOut = () => {
  const users = JSON.parse(getUser());

  users.forEach((user) => {
    currentUser.id === user.id;
    user.loggedIn = false;
  });

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.removeItem("loggedInUser");
  window.location.href = "./pages/login.html";
};

/* const logOutButton = document.querySelector(".header__profile-item--logout");
logOutButton.addEventListener("click", logOut); */

const welcomeSign = document.querySelector(".welcome-sign");
welcomeSign.innerText = `Welcome, ${currentUser.first_name}`;

const headerDropdown = document.querySelector(".header__dropdown");

const profileIcon = document.querySelector(".header__profile-icon");
profileIcon.addEventListener("click", (e) => {
  headerDropdown.focus();
  headerDropdown.classList.toggle("header__dropdown--show");
});

const profileName = document.querySelector(".header__profile-name");
//  profileName.innerText = `${currentUser.first_name}`;

document.addEventListener("click", (e) => {
  if (!profileIcon.contains(e.target)) {
    headerDropdown.classList.remove("header__dropdown--show");
  }
});
const headerList = document.querySelector(".header__list");

const createNavLinks = () => {
  data.categories.forEach((category) => {
    const navLink = document.createElement("a");
    navLink.innerText = category.category;
    navLink.classList.add("header__list-item");
    headerList.append(navLink);
  });
};

createNavLinks();

const dropdownList = document.querySelector(".header__dropdown-list");

const createDropdownItem = (item) => {
  const listItem = document.createElement("li");
  listItem.classList.add(
    "header__dropdown-item",
    `header__dropdown-item--${item.name.replace(" ", "-").toLowerCase()}`
  );
  listItem.innerHTML = item.icon;

  const listLink = document.createElement("a");
  listLink.classList.add("header__dropdown-link");
  listLink.innerText = item.name;
  listLink.href = item.link;
  listItem.append(listLink);
  dropdownList.append(listItem);
};

data.dropdown.forEach((item) => {
  createDropdownItem(item);
});
