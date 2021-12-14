import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { globalDispatchContext, Types, useGlobalState } from "../../Contexts";

const Toast = () => {
  const globalState = useGlobalState();
  const _dispatch = React.useContext(globalDispatchContext);

  const handleClose = () => _dispatch({ type: Types.Close_Alert });

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={globalState.toastAlert.open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={globalState.toastAlert.type}>
          {globalState.toastAlert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Toast;
