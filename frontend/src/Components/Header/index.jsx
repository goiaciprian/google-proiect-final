import {
  BottomNavigation,
  BottomNavigationAction,
  Typography,
} from "@mui/material";
import React from "react";
import { globalDispatchContext, Types } from "../../Contexts";
import { FlexDiv, mainColor, whiteColor } from "../../Styles";
import LoginIcon from "@mui/icons-material/Login";

const Header = () => {
  const _dispatch = React.useContext(globalDispatchContext);

  return (
    <BottomNavigation
      showLabels
      sx={{ backgroundColor: mainColor, color: whiteColor }}
    >
      <Typography variant="h5" sx={{ marginTop: "1em", marginLeft: "2em" }}>
        Django Apartamente App
      </Typography>
      <BottomNavigationAction
        label="Login"
        value="login"
        icon={<LoginIcon sx={{ color: whiteColor }} />}
        onClick={() => {
          _dispatch({
            type: Types.Open_Modal,
            payload: "login",
          });
        }}
      />
    </BottomNavigation>

    // <div>
    //   <Button
    //     variant="contained"
    //     onClick={() =>
    //       _dispatch({
    //         type: Types.Open_Modal,
    //         payload: "login",
    //       })
    //     }
    //   >
    //     Login
    //   </Button>
    //   <Button
    //     variant="contained"
    //     onClick={() =>
    //       _dispatch({
    //         type: Types.Open_Modal,
    //         payload: "register",
    //       })
    //     }
    //   >
    //     Register
    //   </Button>
    // </div>
  );
};

export default Header;
