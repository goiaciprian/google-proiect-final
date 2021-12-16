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

export const checkRegisterForm = (data) => {
  let error = data["password"] !== data["confirm_password"];
  Object.keys(data).forEach((key) => {
    if (data[key] === "") {
      error = true;
    }
  });

  return error;
};
