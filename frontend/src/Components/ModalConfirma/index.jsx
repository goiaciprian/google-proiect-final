import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Types, useGlobalState, useGlobalStateDispatch } from "../../Contexts";
import { aplica_apartament } from "../../Utils";

function ModalConfirma() {
  const globalState = useGlobalState();
  const _dispatch = useGlobalStateDispatch();

  const handleClose = () => _dispatch({ type: Types.Close_Modal });

  const handleAplicaLaApartament = () => {
    aplica_apartament({
      apartament: globalState.modalState.id,
      user: globalState.auth.user.user_id,
    })
      .then((response) => {
        _dispatch({ type: Types.Close_Modal });
        _dispatch({
          type: Types.Open_Alert,
          payload: { message: "Aplicat la apartament", type: "success" },
        });
      })
      .catch((err) => {
        console.log(err);
        _dispatch({
          type: Types.Open_Alert,
          payload: { message: err.message, type: "error" },
        });
      });
  };

  return (
    <Dialog
      open={
        globalState.modalState.open && globalState.modalState.type === "aplica"
      }
      onClose={handleClose}
    >
      <DialogTitle style={{ display: "flex", alignItems: "center" }}>
        <span style={{ flexGrow: 1 }}>Confirmati actiunea?</span>
        <IconButton sx={{ marginLeft: "auto" }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6">{globalState.modalState.message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{ backgroundColor: "red" }}
          variant="contained"
        >
          Renunta
        </Button>
        <Button
          variant="contained"
          onClick={handleAplicaLaApartament}
          sx={{ backgroundColor: "green" }}
        >
          Aplica
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalConfirma;
