import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import { Types, useGlobalState, useGlobalStateDispatch } from "../../Contexts";
import { FlexDiv } from "../../Styles";
import Form from "../Form";

const ModalApartament = () => {
  const globalState = useGlobalState();
  const _dispatch = useGlobalStateDispatch();

  const handleClose = () => _dispatch({ type: Types.Close_Modal });

  const handleSubmit = (data) => {
    console.log(data);
  }

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
            formTitle="Adauga apartament"
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
