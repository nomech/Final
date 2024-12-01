const convertToCurrency = (cc, style, type, amount) => {
  return new Intl.NumberFormat("cc", { style: style, currency: type,}).format(amount);
};


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




