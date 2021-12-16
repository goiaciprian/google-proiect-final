import React from "react";

const initialState = {
  value: "",
  error: false,
  helperMessage: "",
};

const Types = {
  Set_Value: "SET_VALUE",
  Set_Error: "SET_ERROR",
};

const reducer = (state, action) => {
  switch (action.type) {
    case Types.Set_Value:
      return { ...state, value: action.payload };
    case Types.Set_Error:
      return {
        ...state,
        error: action.payload.error,
        helperMessage: action.payload.helperMessage,
      };
    default:
      return state;
  }
};

export default function useField(defauldValue = "") {
  const [value, setValue] = React.useReducer(
    reducer,
    initialState,
    () => initialState
  );

  const forwardSetState = (value) => {
    setValue({ type: Types.Set_Value, payload: value });
  };

  React.useLayoutEffect(() => {
    setValue({ type: Types.Set_Value, payload: defauldValue });
  }, [defauldValue]);

  const onChange = (e) => {
    setValue({ type: Types.Set_Value, payload: e.target.value });
  };
  const onBlur = () => {
    if (value.value === "" || value.value === defauldValue)
      setValue({
        type: Types.Set_Error,
        payload: { error: true, helperMessage: "Field is required" },
      });
    else
      setValue({
        type: Types.Set_Error,
        payload: { error: false, helperMessage: "" },
      });
  };
  return { value, onChange, onBlur, setState: forwardSetState };
}
