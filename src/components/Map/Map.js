import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import RoutineMachine from "./RoutineMachine";
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;
const Map = (props) => {
  const [map, setMap] = useState(null);
  const routingMachineRef = useRef();

  useEffect(() => {
    if (!map) return;
  }, [map]);
  return (
    <StyledContainer>
      <MapContainer
        doubleClickZoom={false}
        id="mapId"
        zoom={14}
        center={[33.5024, 36.2988]}
        whenCreated={setMap}
        language={"en"}
        style={{ width: "100%", height: "70vh", margin: "0", padding: "0" }}
      >
        <TileLayer
          attribution="Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        />
        <RoutineMachine
          ref={routingMachineRef}
          beginCoords={props.beginCoords}
          destinationCoords={props.destinationCoords}
          addRoute={(route) => props.addRoute(route)}
        />
      </MapContainer>
    </StyledContainer>
  );
};

export default Map;
