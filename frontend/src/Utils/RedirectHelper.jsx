import React from "react";
import { Types, useGlobalStateDispatch } from "../Contexts";
import { Redirect } from "react-router-dom";

export const RedirectHelper = () => {
  const _dispatch = useGlobalStateDispatch();
  React.useEffect(() => {
    _dispatch({ type: Types.Open_Modal, payload: { type: "login" } });
  });
  return <Redirect to="/" />;
};
