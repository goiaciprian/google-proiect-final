import React from "react";
import { Typography } from "@mui/material";

const Message = ({ content }) => {
  return <Typography variant="h6">{content}</Typography>;
};

export default Message;
