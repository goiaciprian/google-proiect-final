import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Types, useGlobalStateDispatch, useGlobalState } from "../../Contexts";
import { FlexDiv } from "../../Styles";
import Form from "../Form";
import {
  checkRegisterForm,
  login,
  register,
  saveTokenToLocalStorage,
} from "../../Utils";

const AuthModal = () => {
  const globalState = useGlobalState();
  const _dispatch = useGlobalStateDispatch();

  const handleClose = () => _dispatch({ type: Types.Close_Modal });

  function postLogin(response) {
    saveTokenToLocalStorage(response.token);
    _dispatch({ type: Types.Set_Auth, payload: response });
    _dispatch({ type: Types.Close_Modal });
    _dispatch({
      type: Types.Open_Alert,
      payload: { message: "Login Successful", type: "success" },
    });
  }

  const handleLogin = (data) => {
    login(data)
      .then((response) => {
        postLogin(response);
      })
      .catch((error) => {
        _dispatch({
          type: Types.Open_Alert,
          payload: { message: error.message, type: "error" },
        });
      });
  };

  const handleRegister = (data) => {
    console.log(data);
    if (checkRegisterForm(data)) return;
    register({
      email: data.email,
      password: data.password,
      first_name: data.first_name,
      last_name: data.last_name,
    })
      .then((response) => {
        postLogin(response);
      })
      .catch((error) =>
        _dispatch({
          type: Types.Open_Alert,
          payload: { message: error.message, type: "error" },
        })
      );
  };

  return (
    <Dialog open={globalState.modalState.open} onClose={handleClose}>
      <DialogTitle sx={{ marginLeft: "auto" }}>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {globalState.modalState.type === "login" && (
          <FlexDiv margin="0 3em 0 3em">
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
              submitCallback={handleLogin}
            />
          </FlexDiv>
        )}
        {globalState.modalState.type === "register" && (
          <FlexDiv margin="0 4em 0 4em">
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
                  name: "last_name",
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
              submitCallback={handleRegister}
            />
          </FlexDiv>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
