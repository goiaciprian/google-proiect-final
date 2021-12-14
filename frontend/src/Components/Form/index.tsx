import { Button, Typography } from "@mui/material";
import React from "react";
import { FlexDiv } from "../../Styles";
import InputField, {
  InputFieldProps,
  InputForwardRefProps,
} from "../InputField";

export interface FormProps {
  fields: InputFieldProps[];
  formTitle?: string;
  submitCallback: (data: any) => any;
}

const Form: React.FC<FormProps> = ({
  fields,
  formTitle = null,
  submitCallback,
}) => {
  const fieldsRef = React.useRef(
    fields.map(() => React.createRef<InputForwardRefProps>())
  );
  const [err, setErr] = React.useState(false);

  const hasAnyErros = () => {
    const err = fieldsRef.current.some((field) => field.current?.hasErrors());
    setErr(err);
    return err;
  };

  const submitWrapper = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (hasAnyErros()) return;
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
