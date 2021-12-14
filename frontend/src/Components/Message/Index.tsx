import React from "react";
import { Typography } from "@mui/material";

interface MessageProps {
  content: string;
}

const Message: React.FC<MessageProps> = ({ content }) => {
  return <Typography variant="h6">{content}</Typography>;
};

export default Message;
