import { checkOrReturnToken } from ".";
import _axios from "./axiosAPI";

export const login = async (_form_data) => {
  return (await _axios.post("/login/", _form_data)).data;
};

export const register = async (_form_data) => {
  return (await _axios.post("/register/", _form_data)).data;
};

export const refresh_token = async (token) => {
  return (
    await _axios
      .post("/refresh-token/", { token })
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

export const aplica_apartament = async (_data) => {
  const token = await checkOrReturnToken();
  return (
    await _axios.post(`/ApartamentAplica`, _data, {
      headers: {
        Authorization: `Bearer ${token === null ? "" : token}`,
      },
    })
  ).data;
};

export const get_aplicari_by_user = async (user_id) => {
  const token = await checkOrReturnToken();
  return (
    await _axios.get(`ApartamentAplicariListByUser/${user_id}/`, {
      headers: {
        Authorization: `Bearer ${token === null ? "" : token}`,
      },
    })
  ).data;
};

export const get_apartamente_by_user = async (user_id) => {
  const token = await checkOrReturnToken();
  return (
    await _axios.get(`/ApartamenteByOwnerId/${user_id}/`, {
      headers: {
        Authorization: `Bearer ${token === null ? "" : token}`,
      },
    })
  ).data;
};

export const get_aplicari_by_apartament = async (apartament_id) => {
  const token = await checkOrReturnToken();
  return (
    await _axios.get(`/ApartamentAplicariListByApartament/${apartament_id}/`, {
      headers: {
        Authorization: `Bearer ${token === null ? "" : token}`,
      },
    })
  ).data;
};

export const get_locatari_by_apartament = async (apartament_id) => {
  const token = await checkOrReturnToken();
  return (
    await _axios.get(`/ApartamentLocuitoriListByApartament/${apartament_id}/`, {
      headers: {
        Authorization: `Bearer ${token === null ? "" : token}`,
      },
    })
  ).data;
};

export const update_status_aplicare = async (aplicare_id, status) => {
  const token = await checkOrReturnToken();
  return (
    await _axios.post(
      `/ApartamentUpdateAplicare/${aplicare_id}/${status ? 1 : 0}/`,
      {
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${token === null ? "" : token}`,
        },
      }
    )
  ).data;
};

export const change_status_locatar = async (contract_id, sts) => {
  const token = await checkOrReturnToken();
  return (
    await _axios.post(
      `/ApartamentLocatarChangeStatus/${contract_id}/${sts}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token === null ? "" : token}`,
        },
      }
    )
  ).data;
};
