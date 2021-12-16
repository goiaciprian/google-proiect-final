import ApartamentCard from "../Components/ApartamentCard";
import Loader from "../Components/Loader";
import { globalStateContext } from "../Contexts";
import { FlexDiv } from "../Styles";
import React from "react";

export default function MainPage() {
  const globalState = React.useContext(globalStateContext);

  const [apartamente, setApartamete] = React.useState({
    items: [],
    loaded: false,
    error: null,
  });

  React.useEffect(() => {
    setApartamete(globalState.apartamente_list);
  }, [globalState]);

  return (
    <>
      <FlexDiv gap="2em" flexWrap="wrap" maxWidth="1400px" margin="0 auto">
        {!apartamente.loaded ? (
          <Loader />
        ) : (
          apartamente.items.map((apartament, index) => {
            return <ApartamentCard apartament={apartament} key={index} />;
          })
        )}
      </FlexDiv>
    </>
  );
}
