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

  window.location.href = "./pages/login.html  ";
};

const logOutButton = document.querySelector(".header__profile-item--logout");
logOutButton.addEventListener("click", logOut);

const welcomeSign = document.querySelector(".welcome-sign");
welcomeSign.innerText = `Welcome, ${currentUser.first_name}`;

const profileDropdown = document.querySelector(".header__profile-dropdown");

const profileButton = document.querySelector(".header__profile");
profileButton.addEventListener("click", (e) => {
  profileDropdown.focus();

  profileDropdown.classList.toggle("header__profile-dropdown--show");
});

const profileName = document.querySelector(".header__profile-name");
//profileName.innerText = `${currentUser.first_name}`;

document.addEventListener("click", (e) => {
  if (!profileButton.contains(e.target)) {
    profileDropdown.classList.remove("header__profile-dropdown--show");
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