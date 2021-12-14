import { Button, Typography } from "@mui/material";
import React from "react";
import { FlexDiv } from "../../Styles";
import InputField from "../InputField";

const Form = ({ fields, formTitle = null, submitCallback }) => {
  const fieldsRef = React.useRef(fields.map(() => React.createRef()));
  const [err, setErr] = React.useState(false);

  const hasAnyErros = () => {
    const err = fieldsRef.current.some((field) => field.current?.hasErrors());
    setErr(err);
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

  const submitWrapper = (e) => {
    e.preventDefault();
    if (hasAnyErros()) return;
    submitCallback(makeData());
  };

  return (
    <FlexDiv flexDirection="column" gap="1em" alignItems="center">
      {formTitle && <Typography variant="h6">{formTitle}</Typography>}
      {fields.map((fieldProps, index) => (
        <InputField
          ref={fieldsRef.current[index]}
          key={index}
          {...fieldProps}
        />
      ))}
      <Button variant="outlined" onClick={submitWrapper} disabled={err}>
        Submit
      </Button>
    </FlexDiv>
  );
};

export default Form;
