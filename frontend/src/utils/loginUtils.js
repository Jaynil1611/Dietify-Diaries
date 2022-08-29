export const checkEmailAndPassword = (email, password) => {
  return (
    /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/g.test(email) &&
    /^(?=.*[A-Za-z])(?=.*\d).{6,}$/g.test(password)
  );
};

export const checkAuthStatus = (token, isAuthRequired) =>
  token || isAuthRequired === false;

export const getFormValues = (e, type) => {
  switch (type) {
    case "login": {
      const {
        email: { value: email },
        password: { value: password },
      } = e.target;
      return { email, password };
    }
    case "signup": {
      const {
        email: { value: email },
        password: { value: password },
        firstname: { value: firstname },
        lastname: { value: lastname },
      } = e.target;
      return { email, password, firstname, lastname };
    }
    default:
      return new Error("Invalid Choice");
  }
};

export const getFilteredMenuList = (menuList, token) => {
  return token ? menuList.filter(({ name }) => name !== "Login") : menuList;
};

export const menuList = [
  { name: "Home", icon: "fa-home-alt", path: "/" },
  { name: "Playlists", icon: "fa-folder", path: "/playlists" },
  { name: "Liked videos", icon: "fa-thumbs-up", path: "/liked" },
  { name: "Saved", icon: "fa-bookmark", path: "/saved" },
  { name: "History", icon: "fa-history", path: "/history" },
  { name: "Login", icon: "fa-sign-in-alt", path: "/login" },
];
