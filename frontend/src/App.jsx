import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import withGlobalState, { Types, useGlobalStateDispatch } from "./Contexts";
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
  const _dispatch = useGlobalStateDispatch();

  React.useEffect(() => {
    Promise.all([
      checkOrReturnToken(),
      get_tip_apartament(),
      get_apratamente_list(),
    ]).then((response) => {
      //refresk token daca exista
      if (response[0])
        refresh_token(response[0]).then((tokenResp) => {
          if (!tokenResp["non_field_errors"])
            saveTokenToLocalStorage([tokenResp["token"]]);
          _dispatch({ type: Types.Set_Token, payload: tokenResp["token"] });
        });
      _dispatch({ type: Types.Set_Tip_Apartament_List, payload: response[1] });
      _dispatch({ type: Types.Set_Apartament_List, payload: response[2] });
    });
  }, []);

  return (
    <div>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={MainPage} />
        </Switch>
        <AuthModal />
      </BrowserRouter>
    </div>
  );
}

export default withGlobalState(App);
