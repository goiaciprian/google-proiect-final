import { TextField } from "@mui/material";
import React from "react";
import useField from "../../Hooks/useField";

const InputField = React.forwardRef(
  ({ type, defaultValue, label, name }, ref) => {
    const { value, onChange, onBlur } = useField(defaultValue);

    React.useImperativeHandle(ref, () => ({
      hasErrors: () => value.error,
      getValue: () => {
        return { name: value.value };
      },
    }));

    return (
      <TextField
        label={label}
        name={name}
        variant="outlined"
        value={value.value}
        error={value.error}
        helperText={value.helperMessage}
        onChange={onChange}
        onBlur={onBlur}
        inputProps={{ type }}
      />
    );
  }
);

export default InputField;
