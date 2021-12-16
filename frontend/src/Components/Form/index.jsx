import { Button, Typography } from "@mui/material";
import React from "react";
import { FlexDiv } from "../../Styles";
import InputField from "../InputField";

const Form = React.forwardRef(
  ({ fields, formTitle = null, submitCallback }, ref) => {
    const fieldsRef = React.useRef(fields.map(() => React.createRef()));

    const hasAnyErros = () => {
      const err = fieldsRef.current.some((field) => field.current?.hasErrors());
      return err;
    };

    const makeData = () => {
      const data = {};
      fieldsRef.current?.forEach((ref) => {
        const refData = ref.current?.getValue();
        data[refData.name] = refData.value;
      });
      return data;
    };

    const setValues = (valuesArr) => {
      valuesArr.forEach((valueObj) => {
        fieldsRef.current.forEach((ref) => {
          ref.current?.setValue((name, setter) => {
            if (valueObj["name"] === name) {
              setter(valueObj["value"]);
            }
          });
        });
      });
    };

    const submitWrapper = (e) => {
      e.preventDefault();
      if (hasAnyErros()) return;
      submitCallback(makeData());
    };

    React.useImperativeHandle(ref, () => ({
      setValues: setValues,
    }));

    return (
      <FlexDiv flexDirection="column" gap="1em" alignItems="center">
        {formTitle && <Typography variant="h6">{formTitle}</Typography>}
        {fields.map((fieldProps, index) => (
          <InputField
            ref={fieldsRef.current[index]}
            key={index}
            name={fieldProps.name}
            label={fieldProps.label}
            type={fieldProps.type}
            defaultValue={fieldProps.defaultValue}
          />
        ))}
        <Button type="submit" variant="contained" onClick={submitWrapper}>
          Submit
        </Button>
      </FlexDiv>
    );
  }
);

export default Form;
