import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import { Types, useGlobalState, useGlobalStateDispatch } from "../../Contexts";
import { FlexDiv } from "../../Styles";
import { apartament_merge } from "../../Utils";
import Form from "../Form";

const ModalApartament = () => {
  const globalState = useGlobalState();
  const _dispatch = useGlobalStateDispatch();

  const formRef = React.useRef();

  const [selectat, setSelectat] = React.useState(null);

  const handleClose = () => {
    _dispatch({ type: Types.Close_Modal });
    setSelectat(null);
  };

  const updateForm = React.useCallback(() => {
    console.log(selectat);
    formRef.current?.setValues([
      { name: "denumire", value: selectat !== null ? selectat.denumire : "" },
      { name: "chirie", value: selectat !== null ? selectat.chirie : "" },
      {
        name: "metri_patrati",
        value: selectat !== null ? selectat.metri_patrati : "",
      },
      { name: "tip", value: selectat !== null ? selectat.tip.id : "" },
      { name: "adresa", value: selectat !== null ? selectat.adresa : "" },
    ]);
  }, [selectat]);

  React.useEffect(() => {
    if (
      globalState.modalState.id !== null &&
      globalState.modalState.id !== undefined
    ) {
      const apartament = globalState.apartamente_list.items.find(
        (apartament) => apartament.id === globalState.modalState.id
      );
      setSelectat({ ...apartament });
    }
  }, [globalState.modalState, globalState.apartamente_list]);

  React.useEffect(updateForm, [
    updateForm,
    globalState.modalState.open,
    globalState.apartamente_list.items,
  ]);

  const handleSubmit = (data) => {
    if (selectat !== null) data.id = selectat.id;
    data.chirie = parseInt(data.chirie);
    data.metri_patrati = parseInt(data.metri_patrati);
    data.tip_apartament = data.tip;
    data.owner = globalState.auth.user.user_id;
    delete data.tip;
    apartament_merge(data)
      .then((response) => {
        let globalArrApartamente;
        console.log(response);
        if (selectat !== null) {
          globalArrApartamente = [
            ...globalState.apartamente_list.items,
            response,
          ];
        } else {
          globalArrApartamente = [
            ...globalState.apartamente_list.items.filter(
              (apartament) => apartament.id !== response.id
            ),
          ];
        }

        _dispatch({
          type: Types.Update_Apartamente_Array,
          payload: [...globalArrApartamente],
        });

        _dispatch({
          type: Types.Open_Alert,
          payload: {
            type: "success",
            message:
              selectat === null
                ? "Apartament modificat."
                : "Apartament salvat.",
          },
        });
        handleClose();
      })
      .catch((err) => {
        _dispatch({
          type: Types.Open_Alert,
          payload: {
            type: "error",
            message: "Eroare la salvare.",
          },
        });
      });
  };

  return (
    <Dialog
      open={
        globalState.modalState.open &&
        globalState.modalState.type === "apartament"
      }
      onClose={handleClose}
    >
      <DialogTitle></DialogTitle>
      <DialogContent>
        <FlexDiv margin="0 3em 0 3em">
          <Form
            ref={formRef}
            formTitle={
              selectat !== null ? "Modica apartament" : "Adauga apartament"
            }
            fields={[
              {
                label: "Denumire",
                name: "denumire",
                type: "text",
              },
              {
                label: "Chirie",
                name: "chirie",
                type: "number",
              },
              {
                label: "Suprafata",
                name: "metri_patrati",
                type: "number",
              },
              {
                label: "Tip apartament",
                name: "tip",
                type: "text",
                select: true,
                options: [
                  ...globalState.tip_apartament_list.items.map((tip) => {
                    return {
                      value: tip.id,
                      label: tip.denumire,
                    };
                  }),
                ],
              },
              {
                label: "Adresa",
                name: "adresa",
                type: "text",
              },
            ]}
            submitCallback={handleSubmit}
          />
        </FlexDiv>
      </DialogContent>
    </Dialog>
  );
};

export default ModalApartament;
