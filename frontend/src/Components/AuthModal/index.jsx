import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { Types, useGlobalStateDispatch, useGlobalState } from "../../Contexts";
import { FlexDiv } from "../../Styles";
import Form from "../Form";

const AuthModal = () => {
  const globalState = useGlobalState();
  const _dispatch = useGlobalStateDispatch();

  const handleClose = () => _dispatch({ type: Types.Close_Modal });

  return (
    <Dialog open={globalState.modalState.open} onClose={handleClose}>
      <DialogTitle sx={{ marginLeft: "auto" }}>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {globalState.modalState.type === "login" ? (
          <FlexDiv margin="2em 6em">
            <Form
              formTitle="Login"
              fields={[
                {
                  label: "Username",
                  name: "username",
                  type: "string",
                },
                {
                  label: "Password",
                  name: "password",
                  type: "password",
                },
              ]}
              submitCallback={(data) => console.log(data)}
            />
          </FlexDiv>
        ) : (
          <FlexDiv margin="2em 6em">
            <Form
              formTitle="Register"
              fields={[
                {
                  label: "First name",
                  name: "first_name",
                  type: "string",
                },
                {
                  label: "Last name",
                  name: "Last_name",
                  type: "string",
                },
                {
                  label: "Email",
                  name: "email",
                  type: "email",
                },
                {
                  label: "Password",
                  name: "password",
                  type: "password",
                },
                {
                  label: "Confirm password",
                  name: "confirm_password",
                  type: "password",
                },
              ]}
              submitCallback={(data) => console.log(data)}
            />
          </FlexDiv>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
