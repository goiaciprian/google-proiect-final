import { MenuItem, TextField } from "@mui/material";
import React from "react";
import useField from "../../Hooks/useField";

const InputField = React.forwardRef(
  ({ type, defaultValue, label, name, select, options }, ref) => {
    const { value, onChange, onBlur, setState } = useField(defaultValue);

    React.useImperativeHandle(ref, () => ({
      hasErrors: () => value.error || value.value === "",
      setValue: (getName) => {
        getName(name, (value) => {
          setState(value);
        });
      },
      getValue: () => {
        const data = { name: name, value: value.value };
        return data;
      },
    }));

    return (
      <TextField
        id={name}
        select={select}
        label={label}
        name={name}
        variant="outlined"
        value={value.value}
        error={value.error}
        helperText={value.helperMessage}
        onChange={onChange}
        onBlur={onBlur}
        inputProps={{ type: type, autoComplete: "on" }}
        fullWidth={select}
      >
        {select &&
          options.map((option) => {
            return (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            );
          })}
      </TextField>
    );
  }
);

export default InputField;
