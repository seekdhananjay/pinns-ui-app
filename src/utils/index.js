export const getIsLoggedIn = () => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      return true;
    }
    return false;
};

export const getLoggedInUserInfo = () => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      return foundUser;
    }
    return null;
};

export const login = (user) => {
  try{
    localStorage.setItem("user", JSON.stringify(user));
    return true;
  } catch(error){
    console.error('Login error: ', error);
    return false;
  }
};

export const logout = () => {
  try{
    localStorage.removeItem("user");
    return true;
  } catch(error){
    console.error('Logout error: ', error);
    return false;
  }
};
