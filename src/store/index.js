import { createContext, useReducer } from "react";

export const MapsStoreCtx = createContext();

const mapsStoreReducer = (state, action) => {
  switch (action.type) {
    case "pushHistory": {
      const allHistory = [...state.history, action.payload];
      localStorage.setItem("history", JSON.stringify(allHistory));
      return { ...state, history: allHistory };
    }
    case "addBeginCoords": {
      return { ...state, begginingCoords: action.payload };
    }
    case "addDestinationCoords": {
      return { ...state, destinationCoords: action.payload };
    }
    case "actualRoute": {
      return { ...state, actualRoute: action.payload };
    }
    case "addBeginRecently": {
      const found = state.recentlyBegin.find(
        (element) => element === action.payload
      );
      let searchBegin;
      if (found) {
        searchBegin = [...state.recentlyBegin];
      } else {
        searchBegin = [...state.recentlyBegin, action.payload];
      }
      return { ...state, recentlyBegin: searchBegin };
    }
    case "addDestinationRecently": {
      const found = state.recentlyDestination.find(
        (element) => element === action.payload
      );
      let searchDestination;
      if (found) {
        searchDestination = [...state.recentlyDestination];
      } else {
        searchDestination = [...state.recentlyDestination, action.payload];
      }
      return { ...state, recentlyDestination: searchDestination };
    }
    default: {
      return state;
    }
  }
};

const MapsProvider = ({ children }) => {
  let initialHistory = [];
  if (localStorage.getItem("history")) {
    initialHistory = JSON.parse(localStorage.getItem("history"));
  }
  const [state, dispatch] = useReducer(mapsStoreReducer, {
    history: initialHistory,
    begginingCoords: null,
    destinationCoords: null,
    actualRoute: null,
    recentlyBegin: [],
    recentlyDestination: [],
  });
  const value = { state, dispatch };
  return (
    <MapsStoreCtx.Provider value={value}>{children}</MapsStoreCtx.Provider>
  );
};
export { MapsProvider };
