import { DeleteSweepOutlined } from "@mui/icons-material";
import {
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React from "react";
import { Types, useGlobalState, useGlobalStateDispatch } from "../../Contexts";
import { FlexDiv } from "../../Styles";
import { delete_tip_apartament, merge_tip_apartament } from "../../Utils";
import Form from "../Form";
import TableCustom from "../TableCustom";

const ModalTipApartament = () => {
  const globalState = useGlobalState();
  const _dispatch = useGlobalStateDispatch();

  const formRef = React.useRef();

  const [selected, setSelected] = React.useState(null);

  const handleSelected = (elem) => {
    const change = selected?.id === elem?.id ? null : elem;
    setSelected(change);
    formRef.current?.setValues([
      { name: "denumire", value: change !== null ? elem.denumire : "" },
    ]);
  };

  const handleClose = () => _dispatch({ type: Types.Close_Modal });

  const handleDeleteTipApartament = (id) => {
    delete_tip_apartament(id)
      .then((response) => {
        const globalStateArr = [
          ...globalState.tip_apartament_list.items.filter(
            (tip_apartament) => tip_apartament.id !== response.id
          ),
        ];
        _dispatch({
          type: Types.Update_Tip_Apartament_Array,
          payload: globalStateArr,
        });
        _dispatch({
          type: Types.Open_Alert,
          payload: {
            message: "Tip aratament sters.",
            type: "success",
          },
        });
      })
      .catch((error) => {
        _dispatch({
          type: Types.Open_Alert,
          payload: { message: error.message, type: "error" },
        });
      });
  };

  const handleSubmitForm = (data) => {
    const _data = data,
      selectedCopy = selected === null ? null : { ...selected };
    if (selectedCopy !== null) {
      _data.id = selected.id;
      _data.denumire = data.denumire;
    }
    merge_tip_apartament(_data)
      .then((response) => {
        console.log(response);
        console.log(selectedCopy);
        let globalStateArr;
        if (selectedCopy === null)
          globalStateArr = [...globalState.tip_apartament_list.items, response];
        else
          globalStateArr = [
            ...globalState.tip_apartament_list.items.map((tip) => {
              if (response.id === tip.id) tip.denumire = response.denumire;
              return tip;
            }),
          ];
        _dispatch({
          type: Types.Update_Tip_Apartament_Array,
          payload: [...globalStateArr],
        });
        _dispatch({
          type: Types.Open_Alert,
          payload: {
            message: selectedCopy
              ? "Tip apartament modificat."
              : "Tip apartament adaugat.",
            type: "success",
          },
        });
        handleSelected(null);
      })
      .catch((error) => {
        _dispatch({
          type: Types.Open_Alert,
          payload: { message: error.message, type: "error" },
        });
      });
  };

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
        <FlexDiv gap="2em">
          <FlexDiv>
            <TableCustom
              headers={[
                { name: "Select", value: "select" },
                { label: "Denumire", value: "denumire" },
                { label: "Delete", value: "delete" },
              ]}
              data={globalState.tip_apartament_list.items}
              renderColumn={{
                delete: (id, value) => {
                  return (
                    <IconButton
                      onClick={() => handleDeleteTipApartament(id)}
                      sx={{ color: "red" }}
                    >
                      <DeleteSweepOutlined />
                    </IconButton>
                  );
                },
                select: (id, value, elem) => {
                  return (
                    <Checkbox
                      checked={selected?.id === id}
                      onClick={() => handleSelected(elem)}
                    />
                  );
                },
              }}
            />
          </FlexDiv>
          <FlexDiv justifyContent="center" alignItems="center">
            <Form
              ref={formRef}
              formTitle={
                selected ? "Modifica apartament" : "Adauga tip apartament"
              }
              fields={[
                {
                  label: "Denumire",
                  name: "denumire",
                  type: "text",
                },
              ]}
              submitCallback={(data) => handleSubmitForm(data)}
            />
          </FlexDiv>
        </FlexDiv>
      </DialogContent>
    </Dialog>
  );
};

export default ModalTipApartament;
