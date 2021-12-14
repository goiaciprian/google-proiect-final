export const saveTokenToLocalStorage = (value) => {
  localStorage.setItem("token", value);
};

export const checkOrReturnToken = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  }
  return null;
};
