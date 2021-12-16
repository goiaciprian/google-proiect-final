import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Types, useGlobalState, useGlobalStateDispatch } from "../../Contexts";
import { AlignedTypography, LeftAlignSpan } from "../../Styles";

const ApartamentCard = ({ apartament }) => {
  const globalState = useGlobalState();
  const _dispatch = useGlobalStateDispatch();

  const handleClick = () => {
    if (globalState.auth.user === null)
      _dispatch({
        type: Types.Open_Alert,
        payload: {
          type: "warning",
          message: "Trebuie sa fiti autentificat pentru a aplica!",
        },
      });
    else if (globalState.auth.user.user_id === apartament.owner)
      _dispatch({
        type: Types.Open_Alert,
        payload: {
          type: "warning",
          message: "Nu puteti aplica pentru apartamentul dumneavoastra!",
        },
      });
    else
      _dispatch({
        type: Types.Open_Modal,
        payload: {
          type: "aplica",
          message: "Sunteti siguri ca doriti sa aplicati la acest apartament?",
          id: apartament.id,
        },
      });
  };

  return (
    <Card variant="outlined" sx={{ width: "20em" }}>
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              paddingBottom: "1em",
              textAlign: "center",
            }}
          >
            {apartament.denumire}
          </Typography>
          <AlignedTypography>
            Adresa:<LeftAlignSpan>{apartament.adresa}</LeftAlignSpan>
          </AlignedTypography>
          <AlignedTypography>
            Tip apartament:
            <LeftAlignSpan>{apartament.tip.denumire}</LeftAlignSpan>
          </AlignedTypography>
          <AlignedTypography>
            Chirie:<LeftAlignSpan>{apartament.chirie}</LeftAlignSpan>
          </AlignedTypography>
          <AlignedTypography>
            Suprafata:
            <LeftAlignSpan>
              {apartament.metri_patrati} m<sup>2</sup>
            </LeftAlignSpan>
          </AlignedTypography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ApartamentCard;
