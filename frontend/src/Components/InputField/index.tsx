import { TextField } from "@mui/material";
import React from "react";
import useField from "../../Hooks/useField";

export interface InputFieldProps {
  type: "string" | "password" | "email";
  defaultValue?: string;
  label: string;
  name: string;
}

export interface InputForwardRefProps {
  hasErrors: () => boolean;
}

const InputField = React.forwardRef<InputForwardRefProps, InputFieldProps>(
  ({ type, defaultValue, label, name }, ref) => {
    const { value, onChange, onBlur } = useField(defaultValue);

    React.useImperativeHandle(ref, () => ({
      hasErrors: () => value.error,
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
