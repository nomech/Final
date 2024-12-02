export const convertToCurrency = (cc, style, type, amount) => {
  return new Intl.NumberFormat("cc", { style: style, currency: type }).format(
    amount
  );
};

export const getLoggedInUser = () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser === null) {
    window.location.href = "./pages/login.html";
  } else {
    return loggedInUser;
  }
};

export const getUsers = () => {
  const users = localStorage.getItem("users");
  return users;
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


