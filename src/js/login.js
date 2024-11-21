const form = document.querySelector(".login-form");
const register = document.querySelector(".login-form__button--register");

window.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", loginUser);
  register.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "./register.html";
  });
});

const loginUser = (e) => {
  e.preventDefault();

  const users = getData();
  let email;
  let password;

  for (element of e.target.elements) {
    if (element.name && element.tagName.toLowerCase() === "input") {
      if (element.name === "email") {
        email = element.value;
      }

      if (element.name === "password") {
        password = element.value;
      }
    }
  }
  console.log(users);
  console.log(users.length);
  console.log(users.length > 0);


  if (users.length > 0) {
    users.forEach((user) => {
      console.log(user.email);
      console.log(user.password);
      if (user.email === email && user.password === password) {
        user.loggedIn = true;
        storeData(users);
      } else {
        console.error("Invalid username or password");
      }
    });
  }
  redirectUser();
};

const getData = () => {
  const data = JSON.parse(localStorage.getItem("users")) || [];
  return data;
};

const storeData = (data) => {
  localStorage.setItem("users", JSON.stringify(data));
};

const checkLoggedInUser = () => {
  let loginStatus = false;
  const userCount = getData().length;
  const findLoggedInUser = getData().find((user) => user.loggedIn);
  if (findLoggedInUser) {
    const loggedInUser = {
      id: findLoggedInUser.id,
      first_name: findLoggedInUser.first_name,
      last_name: findLoggedInUser.last_name,
      email: findLoggedInUser.email,
    };
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    loginStatus = findLoggedInUser.loggedIn;
  } else if (userCount <= 0) {
    window.location.href = "./register.html";
  }
  return loginStatus;
};

const redirectUser = () => {
  if (checkLoggedInUser()) {
    window.location.href = "../index.html";
  }
};

redirectUser();
