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

export const getLoggedInUser = () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser === null) {
    window.location.href = "./pages/login.html";
  } else {
    return loggedInUser;
  }
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
