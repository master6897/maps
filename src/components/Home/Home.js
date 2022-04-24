import Card from "../Shared/Card/Card";
import { useContext } from "react";
import { MapsStoreCtx } from "../../store";
import styled from "styled-components";

const StyledContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Home = () => {
  const { state } = useContext(MapsStoreCtx);
  return (
    <StyledContainer>
      {state.history.length > 0 ? (
        <h1>Travels history:</h1>
      ) : (
        <h1>Designate your first route!</h1>
      )}
      {state.history.length > 0 &&
        state.history.map((element, index) => {
          return (
            <Card
              destination={element.destination}
              begin={element.begin}
              key={index}
            />
          );
        })}
    </StyledContainer>
  );
};
export default Home;
