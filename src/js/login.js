const form = document.querySelector(".login-form");

window.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", loginUser);
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

  users.forEach((user) => {
    console.log();
    if (user.email === email && user.password === password) {
      user.loggedIn = true;
      storeData(users);
    }
  });

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
  }
  return loginStatus;
};

const redirectUser = () => {
  if (checkLoggedInUser()) {
    window.location.href = "../index.html";
  } else {
    console.error("Invalid username or password")
  }
};

redirectUser();
