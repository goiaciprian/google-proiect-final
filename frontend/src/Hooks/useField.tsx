import React from "react";

export type State = {
  value: any;
  error: boolean;
  helperMessage: string;
};

type Action = {
  type: string;
  payload: any;
};

const initialState = {
  value: "",
  error: false,
  helperMessage: "",
};

enum Types {
  Set_Value = "SET_VALUE",
  Set_Error = "SET_ERROR",
}

const reducer = (state: State, action: Action) => {
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

export default function useField(defauldValue: any = "") {
  const [value, setValue] = React.useReducer(
    reducer,
    initialState,
    () => initialState
  );

  React.useLayoutEffect(() => {
    setValue({ type: Types.Set_Value, payload: defauldValue });
  }, [defauldValue]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  return { value, onChange, onBlur };
}
