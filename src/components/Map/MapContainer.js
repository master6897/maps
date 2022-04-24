import Map from "./Map";
import { useContext, useEffect, useState } from "react";
import { MapsStoreCtx } from "../../store";
import Button from "../Shared/Button/Button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TripDetailsContainer from "../TripDetails/TripDetailsContainer";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & div.map-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  & div.details {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 70%;
    margin: 1rem 0;
    @media (max-width: 480px) {
      width: 90%;
    }
  }
`;

const MapContainer = () => {
  const { state, dispatch } = useContext(MapsStoreCtx);
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [addingInfos, setAddingInfos] = useState(true);
  const [beginCoords, setBeginCoords] = useState();
  const [destinationCoords, setDestinationCoords] = useState();
  useEffect(() => {
    try {
      const beginCoords = {
        lat: state?.begginingCoords[0][0].position.lat,
        lng: state?.begginingCoords[0][0].position.lng,
      };
      setBeginCoords(beginCoords);
      const destinationCoords = {
        lat: state?.destinationCoords[0][0].position.lat,
        lng: state?.destinationCoords[0][0].position.lng,
      };
      setDestinationCoords(destinationCoords);
      const historyObject = {
        begin: state.begginingCoords[0][0].title,
        destination: state.destinationCoords[0][0].title,
      };
      dispatch({ type: "pushHistory", payload: historyObject });
    } catch (err) {
      setErr(true);
    }
  }, [state.begginingCoords, state.destinationCoords, dispatch]);
  const addActualRoute = async (route) => {
    await dispatch({ type: "actualRoute", payload: route });
    setAddingInfos(false);
  };

  const getBackHandler = () => {
    navigate(-1);
  };
  return (
    <StyledContainer>
      {!err && (
        <div className="map-container">
          <Map
            beginCoords={beginCoords}
            destinationCoords={destinationCoords}
            addRoute={(route) => addActualRoute(route)}
          />
          <div className="details">
            {!addingInfos && (
              <TripDetailsContainer getBackHandler={getBackHandler} />
            )}
          </div>
        </div>
      )}
      {err && (
        <>
          <h1>Something went wrong</h1>
          <Button secondary value={"Back"} onClick={getBackHandler} />
        </>
      )}
    </StyledContainer>
  );
};
export default MapContainer;
