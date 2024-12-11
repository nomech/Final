//Imports data and utility functions
import { data } from "./data.js";
import { updateCartAmount, getLoggedInUser, getData } from "./utils.js";

// Cached DOM elements
const domElemets = {
  headerDropdown: document.querySelector(".header__dropdown"),
  profileIcon: document.querySelector(".header__profile-icon"),
  profileName: document.querySelector(".header__profile-name"),
  headerList: document.querySelector(".header__list"),
  dropdownList: document.querySelector(".header__dropdown-list"),
  mobileMenu: document.querySelector(".header__mobile-menu"),
  headerNav: document.querySelector(".header__nav"),
};

// Destructured DOM Elements
const { headerDropdown, profileIcon, headerList, dropdownList, headerNav } =
  domElemets;
const currentUser = JSON.parse(getLoggedInUser());

//Ensures that the page is fully loaded before running the script
window.addEventListener("DOMContentLoaded", () => {
  createNavLinks();
  createDropdownItem();

  // Event listeners for the profile icon and logout button
  const logOutButton = domElemets["LogOut"];
  profileIcon.addEventListener("click", toggleDropdown);
  logOutButton.addEventListener("click", () => logOut());

  //Delegate event listener to the document for the dropdown items
  document.addEventListener("click", (event) => {
    console.log(event.target.classList.contains("header__mobile-menu"));
    // Redirects the user to the selected page
    if (event.target.classList.contains("header__dropdown-item")) {
      console.log("First if");
      window.location.href = getPageUrl(event.target.dataset.id);
      // Closes the dropdown when the user clicks outside the dropdown menu
    } else if (!profileIcon.contains(event.target)) {
      headerDropdown.classList.remove("header__dropdown--show");
    }
    if (event.target.classList.contains("header__mobile-menu")) {
      console.log("Third if");
      headerNav.classList.toggle("header__nav--show");
    }
  });
});

// Function that constructs page URL based on if the site is ran locally or on a server
const getPageUrl = (link) => {
  const origin = window.location.origin;
  const basePath =
    window.location.hostname === "127.0.0.1" ? "/src/pages" : "/pages";
  return `${origin}${basePath}${link}`;
};

// Function that logs out the user
const logOut = () => {
  // Updates the user's logged in status
  const users = getData("users");
  users.forEach((user) => {
    if (currentUser.id === user.id) {
      user.loggedIn = false;
    }
  });

  // Updates the local storage
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.removeItem("loggedInUser");
};

// Function that toggles the dropdown
const toggleDropdown = () => {
  headerDropdown.classList.toggle("header__dropdown--show");
};

// Function that creates the navigation links
const createNavLinks = () => {
  //Iterates through the product categories and creates the navigation links
  data.productCategories.forEach((category) => {
    const navLink = document.createElement("a");
    navLink.innerText = category.name;
    navLink.href = getPageUrl(category.link);
    navLink.classList.add("header__list-item");
    headerList.append(navLink);
  });
};

// Function that creates the dropdown items
const createDropdownItem = () => {
  //Iterates through the user actions and creates the dropdown items
  data.userActions.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.dataset.id = item.link;
    listItem.classList.add(
      "header__dropdown-item",
      `header__dropdown-item--${item.name.replace(" ", "").toLowerCase()}`
    );
    listItem.innerHTML = item.icon;

    //Stores the dropdown items in the DOM elements object
    domElemets[item.name.replace(" ", "")] = listItem;

    const listLink = document.createElement("p");
    listLink.classList.add("header__dropdown-link");

    //Creates the cart counter
    if (item.name === "Cart") {
      const cartCounter = document.createElement("p");
      cartCounter.classList.add("header__dropdown-counter");
      cartCounter.innerText = `(${updateCartAmount()})`;
      listItem.append(cartCounter);
    }
    listLink.innerText = `${item.name}`;

    //Appends the dropdown items to the dropdown list
    listItem.append(listLink);
    dropdownList.append(listItem);
  });
};
