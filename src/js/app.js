const getLoggedInUser = () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser === null) {
    window.location.href = "./pages/login.html";
  } else {
    return loggedInUser;
  }
};

getLoggedInUser();

const getUser = () => {
  const users = localStorage.getItem("users");
  console.log(users);
  return users;
};

const currentUser = JSON.parse(getLoggedInUser());

const logOut = () => {
  const users = JSON.parse(getUser());

  users.forEach((user) => {
    currentUser.id === user.id;
    user.loggedIn = false;
  });

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.removeItem("loggedInUser");

  window.location.href="./pages/loign.html  "
};


const welcomeSign = document.querySelector(".welcome-sign")
console.log(welcomeSign)
welcomeSign.innerText = `Welcome, ${currentUser.first_name}`