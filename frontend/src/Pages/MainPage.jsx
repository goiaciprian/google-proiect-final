import ApartamentCard from "../Components/ApartamentCard";
import Loader from "../Components/Loader";
import { useGlobalState } from "../Contexts";
import { FlexDiv } from "../Styles";

export default function MainPage() {
  const globalState = useGlobalState();

  return (
    <FlexDiv gap="2em" flexWrap="wrap" maxWidth="1400px" margin="0 auto">
      {!globalState.apartamente_list.loaded ? (
        <Loader />
      ) : (
        globalState.apartamente_list.items.map((apartament, index) => {
          return <ApartamentCard apartament={apartament} key={index} />;
        })
      )}
    </FlexDiv>
  );
}
