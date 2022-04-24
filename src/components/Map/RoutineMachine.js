import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = (props) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(props.beginCoords.lat, props.beginCoords.lng),
      L.latLng(props.destinationCoords.lat, props.destinationCoords.lng),
    ],
    lineOptions: {
      styles: [{ color: "green", weight: 4 }],
    },
    show: true,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
  });
  instance.on("routeselected", (e) => {
    let route = e.route;
    props.addRoute(route);
  });
  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
