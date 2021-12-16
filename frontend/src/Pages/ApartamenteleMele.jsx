import { Button } from "@mui/material";
import React from "react";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import ModalTabel from "../Components/ModalTabel";
import TableCustom from "../Components/TableCustom";
import { Types, useGlobalState, useGlobalStateDispatch } from "../Contexts";
import { FlexDiv } from "../Styles";
import { get_apartamente_by_user } from "../Utils";

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
