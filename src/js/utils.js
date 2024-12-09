//Imports data and utility functions
import { data } from "./data.js";

// Function that converts a number to a currency format
export const convertToCurrency = (cc, style, type, amount) => {
// Function that converts a number to a currency format
  return new Intl.NumberFormat(cc, { style: style, currency: type }).format(
    amount
  );
};

// Function that gets data from the local storage
export const getData = (key) => {
  const data = JSON.parse(localStorage.getItem(key)) || [];
  return data;
};


// Function that stores data in the local storage
export const storeData = (data) => {
  localStorage.setItem("users", JSON.stringify(data));
};


// Function that checks if a user is logged in
export const checkLoggedInUser = () => {

  //Gets the users from the local storage
  let loginStatus = false;
  
  //Gets the loggedin users from the local storage
  const findLoggedInUser = getData("users").find((user) => user.loggedIn);

  //Checks if a user is logged in
  if (findLoggedInUser) {
    //Creates a new object with the logged in user's details
    const loggedInUser = {
      id: findLoggedInUser.id,
      first_name: findLoggedInUser.first_name,
      last_name: findLoggedInUser.last_name,
      email: findLoggedInUser.email,
      address: findLoggedInUser.address,
    };

    //Stores the logged in user's details in the local storage
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    
    //Returns the logged in status
    return findLoggedInUser.loggedIn;
  }

  // Returns the logged in status
  return loginStatus;
};

// Function that gets the logged in user
export const getLoggedInUser = () => {
  
  //Gets the logged in user from the local storage
  const loggedInUser = localStorage.getItem("loggedInUser");
  
  //Checks if the user is logged in, if not, redirects to the login page
  if (loggedInUser === null) {
    window.location.href = "./pages/login.html";
  } else {
    return loggedInUser;
  }
};

// Function that gets the current page id
export const getPageId = () => {
  return parseInt(new URLSearchParams(window.location.search).get("id"));
};


// Function that gets the current product
export const updateCartAmount = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  let cartAmount = 0;
  if (cart) {
    cartAmount = cart.length;
  }

  return cartAmount;
};


// Function that gets the current category
export const getCurrentCategory = () => {
  const page = window.location.pathname.split("/").pop().split(".")[0];
  return data.productCategories.find((category) => category.value.toLowerCase() === page).id;
};
