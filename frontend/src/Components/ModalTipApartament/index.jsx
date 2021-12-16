import { DeleteSweepOutlined } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React from "react";
import { Types, useGlobalState, useGlobalStateDispatch } from "../../Contexts";
import { FlexDiv } from "../../Styles";
import Form from "../Form";
import TableCustom from "../TableCustom";

const ModalTipApartament = () => {
  const globalState = useGlobalState();
  const _dispatch = useGlobalStateDispatch();

  const handleClose = () => _dispatch({ type: Types.Close_Modal });

  return (
    <Dialog
      open={
        globalState.modalState.open &&
        globalState.modalState.type === "tip_apartament"
      }
      onClose={handleClose}
      maxWidth="lg"
    >
      <DialogTitle>Tipuri de apartament</DialogTitle>
      <DialogContent>
        <FlexDiv>
          <FlexDiv>
            <TableCustom
              headers={[
                { label: "Denumire", value: "denumire" },
                { label: "Delete", value: "delete" },
              ]}
              data={globalState.tip_apartament_list.items}
              renderColumn={{
                delete: (id, value) => {
                  return (
                    <IconButton sx={{ color: "red" }}>
                      <DeleteSweepOutlined />
                    </IconButton>
                  );
                },
              }}
            />
          </FlexDiv>
          <FlexDiv>
            <Form
            />
          </FlexDiv>
        </FlexDiv>
      </DialogContent>
    </Dialog>
  );
};

export default ModalTipApartament;
