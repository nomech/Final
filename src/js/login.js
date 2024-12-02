const form = document.querySelector(".login-form");
const register = document.querySelector(".login-form__button--register");

window.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", loginUser);
  register.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "./register.html";
  });
});

let loginAttepmted = false;
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

  let userAuthenticated = false;
  if (users.length > 0) {
    users.forEach((user) => {
      if (user.email === email && user.password === password) {
        user.loggedIn = true;
        userAuthenticated = true;
        storeData(users);
      }
    });
  }

 

  if (userAuthenticated) {
    redirectUser();
  } else if (!loginAttepmted) {
    console.log(loginAttepmted);
    loginAttepmted = true;
    
    const buttonContainer = document.querySelector(
      ".login-form__button-container"
    );
    const error = document.createElement("p");
    error.textContent = "Invalid username or password";
    error.classList.add("error");
    buttonContainer.before(error);
  }
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
  }
};

//TOD: Add alert message for invalid username or password
