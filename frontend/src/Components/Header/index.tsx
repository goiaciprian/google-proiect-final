import { Button } from "@mui/material";
import React from "react";
import withModalState, {
  ModalTypes,
  useModalDispatch,
} from "../../Contexts/modalState";

const Header = () => {
  const _modal_dispatch = useModalDispatch();

  return (
    <div>
      <Button
        variant="contained"
        onClick={() =>
          _modal_dispatch({
            type: ModalTypes.Open_Modal,
            payload: { open: true, type: "login" },
          })
        }
      >
        Login
      </Button>
      <Button
        variant="contained"
        onClick={() =>
          _modal_dispatch({
            type: ModalTypes.Open_Modal,
            payload: { open: true, type: "register" },
          })
        }
      >
        Register
      </Button>
    </div>
  );
};

export default withModalState(Header);
