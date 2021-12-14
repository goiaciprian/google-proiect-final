import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import withModalState, {
  initial_state_modal,
  ModalState,
  ModalTypes,
  useModalDispatch,
  useModalState,
} from "../../Contexts/modalState";
import { FlexDiv } from "../../Styles";
import Form from "../Form";

const AuthModal = () => {
  const modalState = useModalState();
  const _modal_dispatch = useModalDispatch();

  const handleClose = () => _modal_dispatch({ type: ModalTypes.Close_Modal });

  return (
    <Dialog open={modalState.open} onClose={handleClose}>
      <DialogContent>
        {modalState.type === "login" ? (
          <FlexDiv>
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
          <FlexDiv>
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

export default withModalState(AuthModal);
