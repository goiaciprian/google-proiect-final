import moment from "moment";
import React from "react";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import TableCustom from "../Components/TableCustom";
import { useGlobalState } from "../Contexts";
import { FlexDiv } from "../Styles";
import { get_aplicari_by_user } from "../Utils";

function AplicarileMele() {
  const globalState = useGlobalState();
  const [aplicariUser, setAplicariUser] = React.useState([]);
  const [loading, setloading] = React.useState({ val: true, error: null });

  React.useLayoutEffect(() => {
    get_aplicari_by_user(globalState.auth.user.user_id)
      .then((arr) => {
        setAplicariUser(
          arr.map((aplicare) => {
            return {
              denumire_apartament: aplicare.apartament.denumire,
              adresa_apartament: aplicare.apartament.adresa,
              chirie_apartament: aplicare.apartament.chirie,
              denumire_aplicant:
                aplicare.aplicant.first_name +
                " " +
                aplicare.aplicant.last_name,
              stasus_aplicare:
                aplicare.status === null
                  ? "In asteptare"
                  : aplicare.status
                  ? "Aprobat"
                  : "Respins",
              data_aplicare: moment(aplicare.created_at).format(
                "DD/MM/yyyy hh:mm A"
              ),
            };
          })
        );
        setloading({ val: false, error: null });
      })
      .catch((err) => {
        setloading({ val: false, error: err });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {loading.val ? (
        <Loader />
      ) : loading.error === null ? (
        <FlexDiv margin="0 2em">
          {aplicariUser.length === 0 ? (
            <Message content="Nu sunt aplicari de afisat." />
          ) : (
            <TableCustom
              headers={[
                { label: "Denumire apartament", value: "denumire_apartament" },
                { label: "Adresa apartament", value: "adresa_apartament" },
                { label: "Chirie apartament", value: "chirie_apartament" },
                { label: "Denumire aplicant", value: "denumire_aplicant" },
                { label: "Stasus aplicare", value: "stasus_aplicare" },
                { label: "Data aplicare", value: "data_aplicare" },
              ]}
              data={aplicariUser}
            />
          )}
        </FlexDiv>
      ) : (
        <Message content={loading.error.message} />
      )}
    </>
  );
}

export default AplicarileMele;
