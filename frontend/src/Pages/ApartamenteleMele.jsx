import { DeleteSweepOutlined } from "@mui/icons-material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Button, IconButton } from "@mui/material";
import React from "react";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import ModalTabel from "../Components/ModalTabel";
import TableCustom from "../Components/TableCustom";
import { Types, useGlobalState, useGlobalStateDispatch } from "../Contexts";
import { FlexDiv } from "../Styles";
import { get_apartamente_by_user, apartament_delete } from "../Utils";

const ApartamenteleMele = () => {
  const globalState = useGlobalState();
  const _dispatch = useGlobalStateDispatch();

  const [apartamente, setApartamente] = React.useState([]);
  const [loading, setloading] = React.useState({ val: true, error: null });

  React.useLayoutEffect(() => {
    get_apartamente_by_user(globalState.auth.user.user_id)
      .then((response) => {
        setApartamente(response);
        setloading({ val: false, error: null });
      })
      .catch((err) => setloading({ val: false, error: err }));
  }, []);

  React.useEffect(() => {
    get_apartamente_by_user(globalState.auth.user.user_id)
      .then((response) => {
        setApartamente(response);
        setloading({ val: false, error: null });
      })
      .catch((err) => setloading({ val: false, error: err }));
  }, [globalState.apartamente_list]);

  const delete_apartament_by_id = (id) => {
    apartament_delete(id)
      .then((deleted) => {
        setApartamente((prevState) => {
          return [
            ...prevState.filter((apartament) => apartament.id !== deleted.id),
          ];
        });
        _dispatch({
          type: Types.Open_Alert,
          payload: {
            message: "Apartament sters.",
            type: "success",
          },
        });
      })
      .catch((err) => {
        _dispatch({
          type: Types.Open_Alert,
          payload: {
            message: err.message,
            type: "error",
          },
        });
      });
  };

  return (
    <>
      {loading.val ? (
        <Loader />
      ) : loading.error === null ? (
        <FlexDiv margin="0 2em">
          <TableCustom
            headers={[
              { label: "Denumire", value: "denumire" },
              { label: "Adresa", value: "adresa" },
              { label: "Chirie", value: "chirie" },
              { label: "Metri patrati", value: "metri_patrati" },
              { label: "Tip apartament", value: "tip_apartament" },
              { label: "Aplicari", value: "aplicari" },
              { label: "Locatari", value: "locatari" },
              { label: "Actiuni", value: "actiuni" },
            ]}
            data={apartamente.map((apartament) => {
              return {
                id: apartament.id,
                denumire: apartament.denumire,
                adresa: apartament.adresa,
                chirie: apartament.chirie,
                metri_patrati: apartament.metri_patrati,
                tip_apartament: apartament.tip.denumire,
              };
            })}
            renderColumn={{
              aplicari: (id, value) => {
                return (
                  <Button
                    onClick={() =>
                      _dispatch({
                        type: Types.Open_Modal,
                        payload: { type: "aplicanti", id: id },
                      })
                    }
                    variant="contained"
                  >
                    Aplicari
                  </Button>
                );
              },
              locatari: (id, value) => {
                return (
                  <Button
                    variant="contained"
                    onClick={() =>
                      _dispatch({
                        type: Types.Open_Modal,
                        payload: { type: "locatari", id: id },
                      })
                    }
                  >
                    Locatari
                  </Button>
                );
              },
              actiuni: (id, value) => {
                return (
                  <FlexDiv gap="2em">
                    <IconButton
                      onClick={() =>
                        _dispatch({
                          type: Types.Open_Modal,
                          payload: { type: "apartament", id: id },
                        })
                      }
                      color="primary"
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => delete_apartament_by_id(id)}
                      sx={{ color: "red" }}
                    >
                      <DeleteSweepOutlined />
                    </IconButton>
                  </FlexDiv>
                );
              },
            }}
          />
        </FlexDiv>
      ) : (
        <Message content={loading.error} />
      )}
      <ModalTabel />
    </>
  );
};

export default ApartamenteleMele;
