import _axios from "./axiosAPI";

export const login = async (_form_data) => {
  return (
    await _axios.post("/login/", _form_data).catch((err) => console.log(err))
  )?.data;
};

export const refresh_token = async (token) => {
  return (
    await _axios
      .post("/refreh-token/", { token })
      .catch((err) => console.log(err))
  )?.data;
};

export const get_apratamente_list = async (pagina = 1, elemente = 10) => {
  return (
    await _axios
      .get(`/ApartamenteList?pagina=${pagina}&&elemente=${elemente}`)
      .catch((err) => console.log(err))
  )?.data;
};

export const get_tip_apartament = async () => {
  return (
    await _axios.get("/TipApartamenteList/").catch((err) => console.log(err))
  )?.data;
};
