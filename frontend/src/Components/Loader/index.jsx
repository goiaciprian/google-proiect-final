import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { FlexDiv } from "../../Styles";

function Loader() {
  return (
    <FlexDiv
      alignItems="center"
      justifyContent="center"
      width="100%"
      flexDirection="column"
    >
      <CircularProgress />
      <Typography variant="h5">Incarcam datele</Typography>
    </FlexDiv>
  );
}

export default Loader;
