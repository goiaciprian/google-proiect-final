import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import moment from "moment";
import React from "react";
import { Types, useGlobalState, useGlobalStateDispatch } from "../../Contexts";
import { FlexDiv } from "../../Styles";
import {
  change_status_locatar,
  get_aplicari_by_apartament,
  get_locatari_by_apartament,
  update_status_aplicare,
} from "../../Utils";
import Loader from "../Loader";
import Message from "../Message";
import TableCustom from "../TableCustom";

const initial_state = {
  data: { val: [], loading: true, err: null },
  headers: [],
  renderColumn: undefined,
};

const stateReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_STATUS":
      const arr = state.data.val.map((aplicare) => {
        if (aplicare.id === action.payload.id) {
          if (Object.keys(aplicare).includes("status"))
            aplicare.status = action.payload.status ? "Aprobat" : "Respins";
          else
            aplicare.locuieste_in_prezent = action.payload.status ? "Da" : "Nu";
        }

        return aplicare;
      });
      return { ...state, data: { ...state.data, val: arr } };
    case "SET_DATA":
      return { ...state, data: action.payload };
    case "ALL":
      return { ...action.payload };
    case "RESET":
      return initial_state;
    default:
      return state;
  }
};

const ModalTabel = () => {
  const globalState = useGlobalState();
  const _dispatch = useGlobalStateDispatch();

  const [tabelState, setTableState] = React.useReducer(
    stateReducer,
    initial_state,
    () => initial_state
  );

  const reset = () => setTableState({ type: "RESET" });

  const handleClose = () => {
    _dispatch({ type: Types.Close_Modal });
    reset();
  };

  const makeObjects = React.useCallback((modalState) => {
    const headers = [
      { label: "Nume complet", value: "full_name" },
      { label: "Email", value: "email" },
      { label: "Data", value: "data" },
    ];
    let renderColumn = undefined;
    if (modalState.type === "aplicanti") {
      headers.push({ label: "Status", value: "status" });
      headers.push({ label: "Actiuni", value: "actiuni" });
      renderColumn = {
        actiuni: (id, value) => {
          return (
            <>
              <FlexDiv gap="1em">
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "green" }}
                  onClick={() => changeStatus(id, 1)}
                >
                  Accepta
                </Button>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "red" }}
                  onClick={() => changeStatus(id, 0)}
                >
                  Refuza
                </Button>
              </FlexDiv>
            </>
          );
        },
      };
      get_aplicari_by_apartament(modalState.id).then((response) => {
        setTableState({
          type: "ALL",
          payload: {
            data: {
              val: response.map((cerere) => {
                return {
                  id: cerere.id,
                  full_name:
                    cerere.aplicant.first_name +
                    " " +
                    cerere.aplicant.last_name,
                  email: cerere.aplicant.email,
                  data: moment(cerere.created_at).format("DD/MM/yyyy hh:mm A"),
                  status:
                    cerere.status === null
                      ? "In asteptare"
                      : cerere.status
                      ? "Aprobat"
                      : "Respins",
                };
              }),
              loading: false,
              err: null,
            },
            headers: headers,
            renderColumn: renderColumn,
          },
        });
      });
    } else if (modalState.type === "locatari") {
      headers.push({ label: "Locuieste", value: "locuieste_in_prezent" });
      headers.push({ label: "Actiuni", value: "actiuni" });
      renderColumn = {
        actiuni: (id, value) => {
          return (
            <>
              <FlexDiv gap="1em">
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "green" }}
                  onClick={() => locatar_change_status(id, 1)}
                >
                  Accepta
                </Button>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "red" }}
                  onClick={() => locatar_change_status(id, 0)}
                >
                  Refuza
                </Button>
              </FlexDiv>
            </>
          );
        },
      };
      get_locatari_by_apartament(modalState.id)
        .then((response) => {
          setTableState({
            type: "ALL",
            payload: {
              headers: headers,
              renderColumn: renderColumn,
              data: {
                val: response.map((cerere) => {
                  return {
                    id: cerere.id,
                    full_name:
                      cerere.locuitor.first_name +
                      " " +
                      cerere.locuitor.last_name,
                    email: cerere.locuitor.email,
                    data: moment(cerere.created_at).format(
                      "DD/MM/yyyy hh:mm A"
                    ),
                    locuieste_in_prezent: cerere.locuieste_in_prezent
                      ? "Da"
                      : "Nu",
                  };
                }),
                loading: false,
                err: null,
              },
            },
          });
        })
        .catch((err) =>
          _dispatch({
            type: Types.Open_Alert,
            payload: { message: err, type: "error" },
          })
        );
    }
  }, []);

  React.useEffect(() => {
    if (globalState.modalState.type === "aplicanti") {
      get_aplicari_by_apartament(globalState.modalState.id)
        .then((response) => {
          setTableState({
            type: "SET_DATA",
            payload: { val: response, loading: false, err: null },
          });
        })
        .catch((err) =>
          setTableState({
            type: "SET_DATA",
            payload: { val: [], loading: false, err: err },
          })
        );
    } else if (globalState.modalState.type === "locatari") {
      get_aplicari_by_apartament(globalState.modalState.id)
        .then((response) => {
          setTableState({
            type: "SET_DATA",
            payload: { val: response, loading: false, err: null },
          });
        })
        .catch((err) =>
          setTableState({
            type: "SET_DATA",
            payload: { val: [], loading: false, err: err },
          })
        );
    }
    makeObjects(globalState.modalState);
    return () => {
      reset();
    };
  }, [globalState.modalState]);

  const changeStatus = (id, status) => {
    update_status_aplicare(id, status)
      .then((respose) => {
        _dispatch({
          type: Types.Open_Alert,
          payload: {
            message: "Statusul aplicarii a fost schimbat!",
            type: "success",
          },
        });
        setTableState({
          type: "UPDATE_STATUS",
          payload: { id: id, status: status },
        });
      })
      .catch((err) => {
        _dispatch({
          type: Types.Open_Alert,
          payload: { message: err.message, type: "error" },
        });
      });
  };

  const locatar_change_status = (id, status) => {
    change_status_locatar(id, status)
      .then(() => {
        _dispatch({
          type: Types.Open_Alert,
          payload: {
            message: "Statusul locatarului a fost schimbat!",
            type: "success",
          },
        });
        setTableState({
          type: "UPDATE_STATUS",
          payload: { id: id, status: status },
        });
      })
      .catch((err) =>
        _dispatch({
          type: Types.Open_Alert,
          payload: { message: err, type: "error" },
        })
      );
  };

  return (
    <Dialog
      open={
        globalState.modalState.open &&
        (globalState.modalState.type === "locatari" ||
          globalState.modalState.type === "aplicanti")
      }
      onClose={handleClose}
      maxWidth="lg"
    >
      <DialogTitle>Aplicanti</DialogTitle>
      <DialogContent>
        {tabelState.data.loading ? (
          <Loader />
        ) : tabelState.data.err ? (
          <Message content={tabelState.data.err} />
        ) : tabelState.data.val.length !== 0 ? (
          <TableCustom
            headers={tabelState.headers}
            data={tabelState.data.val}
            renderColumn={tabelState.renderColumn}
          />
        ) : (
          <Message content="Nu exista aplicanti" />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalTabel;
