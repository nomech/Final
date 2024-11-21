const getLoggedInUser = () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser === null) {
    window.location.href = "./pages/login.html";
  } else {
    return loggedInUser;
  }
};

const getUser = () => {
  const users = localStorage.getItem("users");
  console.log(users);
  return users;
};

const currentuser = JSON.parse(getLoggedInUser());

const logOut = () => {
  const currentUser = JSON.parse(getLoggedInUser());
  const users = JSON.parse(getUser());

  users.forEach((user) => {
    currentUser.id === user.id;
    user.loggedIn = false;
  });

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.removeItem("loggedInUser");
};

logOut();
