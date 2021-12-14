import _axios from "./axiosAPI";

export type LoginJSON = {
  username: string;
  password: string;
};

export type User = {
  username: string;
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_superuser: boolean;
};

export type TipApartament = {
  id: number;
  denumire: string;
};

export type Apartament = {
  id: number;
  denumire: string;
  adresa: string;
  tip_apartament: number;
  chirie: number;
  metri_patrati: number;
};

export const login = async (_form_data: LoginJSON) => {
  return (
    await _axios.post("/login/", _form_data).catch((err) => console.log(err))
  )?.data;
};

export const refresh_token = async (token: string) => {
  return (
    await _axios
      .post("/refreh-token/", { token })
      .catch((err) => console.log(err))
  )?.data;
};

export const get_apratamente_list = async (
  pagina: number = 1,
  elemente: number = 10
) => {
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
