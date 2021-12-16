import {
  Typography,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
} from "@mui/material";
import React from "react";
import { globalDispatchContext, Types, useGlobalState } from "../../Contexts";
import { FlexDiv, whiteColor } from "../../Styles";
import LoginIcon from "@mui/icons-material/Login";
import { AccountCircle } from "@mui/icons-material";
import { useHistory } from "react-router-dom";

const Header = (props) => {
  const history = useHistory();

  const globalState = useGlobalState();
  const _dispatch = React.useContext(globalDispatchContext);

  const [anchorElem, setAnchorElem] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorElem(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElem(null);
  };

  return (
    <AppBar postion="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <span onClick={() => history.push("/")} style={{ cursor: "pointer" }}>
            Django
          </span>
        </Typography>
        {globalState.auth.user === null ? (
          <>
            <Button
              startIcon={<LoginIcon />}
              sx={{ color: whiteColor }}
              onClick={() =>
                _dispatch({
                  type: Types.Open_Modal,
                  payload: { type: "login" },
                })
              }
            >
              Login
            </Button>
            <Button
              sx={{ color: whiteColor }}
              onClick={() =>
                _dispatch({
                  type: Types.Open_Modal,
                  payload: { type: "register" },
                })
              }
            >
              Register
            </Button>
          </>
        ) : (
          <FlexDiv alignItems="center">
            <Typography>
              Hello, {globalState.auth.user.first_name}{" "}
              {globalState.auth.user.last_name}
            </Typography>
            <IconButton size="large" onClick={handleMenu}>
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorElem}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElem)}
              onClose={handleClose}
            >
              {globalState.auth.user.is_superuser && (
                <MenuItem
                  onClick={() => {
                    _dispatch({
                      type: Types.Open_Modal,
                      payload: { type: "tip_apartament" },
                    });
                    handleClose();
                  }}
                >
                  Tipuri Apartament
                </MenuItem>
              )}
              <MenuItem onClick={() => {
                _dispatch({
                  type: Types.Open_Modal,
                  payload: { type: "apartament", id: null },
                })
                handleClose();
              }} >Adauga apartament</MenuItem>
              <MenuItem
                onClick={() => {
                  history.push("/aplicarile-mele");
                  handleClose();
                }}
              >
                Aplicarile mele
              </MenuItem>
              <MenuItem
                onClick={() => {
                  history.push("/apartamentele-mele");
                  handleClose();
                }}
              >
                Apartamentele mele
              </MenuItem>
              <MenuItem
                onClick={() =>
                  _dispatch({
                    type: Types.Set_User,
                    payload: null,
                  })
                }
              >
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </FlexDiv>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
