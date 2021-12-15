import { TextField } from "@mui/material";
import React from "react";
import useField from "../../Hooks/useField";

const InputField = React.forwardRef(
  ({ type, defaultValue, label, name }, ref) => {
    const { value, onChange, onBlur } = useField(defaultValue);

    React.useImperativeHandle(ref, () => ({
      hasErrors: () => value.error || value.value === "",
      getValue: () => {
        const data = { name: name, value: value.value };
        return data;
      },
    }));

    return (
      <TextField
        id={name}
        label={label}
        name={name}
        variant="outlined"
        value={value.value}
        error={value.error}
        helperText={value.helperMessage}
        onChange={onChange}
        onBlur={onBlur}
        inputProps={{ type, autoComplete: "on" }}
      />
    );
  }
);

export default InputField;
