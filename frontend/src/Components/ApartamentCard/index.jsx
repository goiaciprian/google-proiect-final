import { CardContent, Typography } from "@mui/material";
import React from "react";

const ApartamentCard = ({ apartament }) => (
  <CardContent>
    <Typography>apartament.denumire</Typography>
    <Typography>apartament.adresa</Typography>
    <Typography>apartament.chirie</Typography>
    <Typography>apartament.metri_patrati</Typography>
  </CardContent>
);

export default ApartamentCard;
