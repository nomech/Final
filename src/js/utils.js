import { data } from "./data.js";

export const convertToCurrency = (cc, style, type, amount) => {
  return new Intl.NumberFormat(cc, { style: style, currency: type }).format(
    amount
  );
};

export const getData = (key) => {
  const data = JSON.parse(localStorage.getItem(key)) || [];
  return data;
};

export const storeData = (data) => {
  localStorage.setItem("users", JSON.stringify(data));
};

export const checkLoggedInUser = () => {
  let loginStatus = false;
  const findLoggedInUser = getData("users").find((user) => user.loggedIn);

  if (findLoggedInUser) {
    const loggedInUser = {
      id: findLoggedInUser.id,
      first_name: findLoggedInUser.first_name,
      last_name: findLoggedInUser.last_name,
      email: findLoggedInUser.email,
      address: findLoggedInUser.address,
    };
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    return findLoggedInUser.loggedIn;
  }

  return loginStatus;
};

export const getLoggedInUser = () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser === null) {
    window.location.href = "./pages/login.html";
  } else {
    return loggedInUser;
  }
};

export const updateLoggedInUser = (user) => {
  localStorage.setItem("loggedInUser", JSON.stringify(user));
};

export const getPageId = () => {
  return parseInt(new URLSearchParams(window.location.search).get("id"));
};

export const updateCartAmount = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  let cartAmount = 0;
  if (cart) {
    cartAmount = cart.length;
  }

  return cartAmount;
};

export const getCurrentCategory = () => {
  const page = window.location.pathname.split("/").pop().split(".")[0];
  return data.productCategories.find(
    (category) => category.value.toLowerCase() === page
  ).id;
};
