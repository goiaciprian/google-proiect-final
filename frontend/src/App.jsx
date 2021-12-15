import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import withGlobalState, {
  Types,
  useGlobalState,
  useGlobalStateDispatch,
} from "./Contexts";
import MainPage from "./Pages/MainPage";
import {
  checkOrReturnToken,
  get_apratamente_list,
  get_tip_apartament,
  RedirectHelper,
  refresh_token,
  saveTokenToLocalStorage,
} from "./Utils";
import AuthModal from "./Components/AuthModal";
import Header from "./Components/Header";
import ModalConfirma from "./Components/ModalConfirma";
import AplicarileMele from "./Pages/AplicarileMele";
import ApartamenteleMele from "./Pages/ApartamenteleMele";

function App() {
  const globalState = useGlobalState();
  const _dispatch = useGlobalStateDispatch();

  React.useEffect(() => {
    Promise.all([
      checkOrReturnToken(),
      get_tip_apartament(),
      get_apratamente_list(),
    ])
      .then((response) => {
        try {
          if (response[0]) {
            refresh_token(response[0])
              .then((tokenResp) => {
                saveTokenToLocalStorage([tokenResp["token"]]);
                _dispatch({
                  type: Types.Set_Auth,
                  payload: {
                    token: tokenResp["token"],
                    user: tokenResp["user"],
                  },
                });
              })
              .catch((err) => {});
          }
        } catch (err) {}

        _dispatch({
          type: Types.Set_Tip_Apartament_List,
          payload: { items: response[1], loaded: true, error: null },
        });
        _dispatch({
          type: Types.Set_Apartament_List,
          payload: { items: response[2], loaded: true, error: null },
        });
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Header />
        <div style={{ marginTop: "70px", paddingTop: "2em" }}>
          <Switch>
            <Route path="/" exact component={MainPage} />
            <Route path="/aplicarile-mele">
              {globalState.auth.user === null ? (
                <RedirectHelper />
              ) : (
                <AplicarileMele />
              )}
            </Route>
            <Route path="/apartamentele-mele">
              {globalState.auth.user === null ? (
                <RedirectHelper />
              ) : (
                <ApartamenteleMele />
              )}
            </Route>
          </Switch>
        </div>
        <AuthModal />
        <ModalConfirma />
      </BrowserRouter>
    </div>
  );
}

export default withGlobalState(App);
