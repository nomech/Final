const form = document.querySelector(".register-form");

window.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", registerUser);
});

const registerUser = (e) => {
  e.preventDefault();
  const userList = getData();
  const user = { id: Date.now(), loggedIn: false };

  let password;
  let confirmPassword;

  for (element of e.target.elements) {
    if (element.name === "password") {
      password = element.value;
    }
    if (element.name === "confirm_password") {
      confirmPassword = element.value;
    }

    if (element.name && element.tagName.toLowerCase() === "input") {
      console.log(element.name)
      if (element.name === "email") {
        user[element.name] = element.value.toLowerCase();;
      } else {
        user[element.name] = element.value;
      }
    }
  }

  if (user.password === user.confirm_password) {
    userList.push(user);
    storeData(userList);
    window.location.href="./login.html"
  } else {
    console.error(
      `You need to enter the same password in both "Passowrd" and "Confirm Password"`
    );
  }
};

const storeData = (data) => {
  localStorage.setItem("users", JSON.stringify(data));
};

const getData = () => {
  const data = JSON.parse(localStorage.getItem("users")) || [];
  return data;
};

//TODO: Add a function to check if the user is already exists
