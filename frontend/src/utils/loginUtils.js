export const checkEmailAndPassword = (email, password) => {
  return (
    /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/g.test(email) &&
    /^(?=.*[A-Za-z])(?=.*\d).{6,}$/g.test(password)
  );
};
