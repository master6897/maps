import { useContext, useEffect, useState } from "react";
import { MapsStoreCtx } from "../../store";
import TripDetails from "./TripDetails";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const TripDetailsContainer = (props) => {
  const [price, setPrice] = useState("0");
  const [costs, setCosts] = useState(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [beginAdress, setBeginAdress] = useState();
  const [destinationAdress, setDestinationAdress] = useState();
  const [instructions, setInstructions] = useState();
  const [distance, setDistance] = useState();
  const { state } = useContext(MapsStoreCtx);

  useEffect(() => {
    let tempCosts = (state.actualRoute.summary.totalDistance / 1000) * +price;
    setCosts(tempCosts);
    let tempDays = 0;
    if (state.actualRoute.summary.totalDistance / 1000 < 800) {
      tempDays = 1;
    } else {
      tempDays = state.actualRoute.summary.totalDistance / 1000 / 800;
    }
    setDays(tempDays);
    let tempHours = Math.floor(state.actualRoute.summary.totalTime / 3600);
    let tempMinutes = (
      (state.actualRoute.summary.totalTime % 3600) /
      60
    ).toFixed(0);
    setMinutes(tempMinutes);
    setHours(tempHours);

    setBeginAdress(state.begginingCoords[0][0].title);
    setDestinationAdress(state.destinationCoords[0][0].title);
    setInstructions(state.actualRoute.instructions);
    setDistance(state.actualRoute.summary.totalDistance);
  }, [price, state.actualRoute, state]);

  const getPriceHandler = (value) => {
    setPrice(value);
  };

  return (
    <StyledContainer>
      <TripDetails
        price={price}
        getPrice={(value) => getPriceHandler(value)}
        costs={costs}
        days={days}
        hours={hours}
        minutes={minutes}
        beginAdress={beginAdress}
        destinationAdress={destinationAdress}
        instructions={instructions}
        distance={distance}
        getBackHandler={props.getBackHandler}
      />
    </StyledContainer>
  );
};
export default TripDetailsContainer;
