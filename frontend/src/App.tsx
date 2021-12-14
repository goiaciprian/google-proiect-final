import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import withGlobalState, { Types, useDispatch } from "./Contexts";
import MainPage from "./Pages/MainPage";
import {
  checkOrReturnToken,
  get_apratamente_list,
  get_tip_apartament,
  refresh_token,
  saveTokenToLocalStorage,
} from "./Utils";
import AuthModal from "./Components/AuthModal";
import Header from "./Components/Header";

function App() {
  const _dispatch = useDispatch();

  // React.useEffect(() => {
  //   Promise.all([
  //     checkOrReturnToken(),
  //     get_tip_apartament(),
  //     get_apratamente_list(),
  //   ]).then((response) => {
  //     //refresk token daca exista
  //     if (response[0])
  //       refresh_token(response[0]).then((token) => {
  //         saveTokenToLocalStorage(token);
  //         _dispatch({ type: Types.Set_Token, payload: token });
  //       });
  //     _dispatch({ type: Types.Set_Tip_Apartament_List, payload: response[1] });
  //     _dispatch({ type: Types.Set_Apartament_List, payload: response[2] });
  //   });
  // }, [_dispatch]);

  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/404" element={<div>404</div>} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
      <AuthModal />
    </div>
  );
}

export default withGlobalState(App);
