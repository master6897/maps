import RouteForm from "./RouteForm";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { MapsStoreCtx } from "../../store";
import useHttp from "../../hooks/useHttp";
import Modal from "../Shared/Modal/Modal";

const RouteFormContainer = () => {
  const navigate = useNavigate();
  const [begginingAdress, setBegginingAdress] = useState("");
  const [destinationAdress, setDestinationAdress] = useState("");
  const [beginFocus, setBeginFocus] = useState(false);
  const [destinationFocus, setDestinationFocus] = useState(false);
  const [isDone, setIsDone] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const { dispatch } = useContext(MapsStoreCtx);

  const applyDataBeggingCoords = (data) => {
    let tempArray = [];
    const promise = new Promise((resolve, reject) => {
      for (let key in data) {
        tempArray.push(data[key]);
      }
      resolve();
      reject(new Error("Something went Wrong"));
    });
    promise.then(() => {
      dispatch({ type: "addBeginCoords", payload: tempArray });
      dispatch({
        type: "addBeginRecently",
        payload: begginingAdress,
      });
    });
  };

  const applyDataDestinationCoords = async (data) => {
    let tempArray = [];
    const promise = new Promise((resolve, reject) => {
      for (let key in data) {
        tempArray.push(data[key]);
      }
      resolve();
      reject(new Error("Something went Wrong"));
    });
    promise.then(() => {
      dispatch({ type: "addDestinationCoords", payload: tempArray });
      dispatch({
        type: "addDestinationRecently",
        payload: destinationAdress,
      });
      if (
        !isErrorDestination &&
        !isErrorBegging &&
        !isLoadingBeggining &&
        !isLoadingDestination
      ) {
        setTimeout(() => {
          setIsDone(true);
          navigate("/route/map");
        }, 1000);
      }
    });
  };

  const {
    isLoadingBeggining,
    isErrorBegging,
    sendRequest: getBegginingCoords,
  } = useHttp(applyDataBeggingCoords);

  const {
    isLoadingDestination,
    isErrorDestination,
    sendRequest: getDestinationCoords,
  } = useHttp(applyDataDestinationCoords);

  const submitForm = (evt) => {
    evt.preventDefault();
    if (
      begginingAdress.trim().length < 1 ||
      destinationAdress.trim().length < 1
    ) {
      setDisabled(true);
    } else {
      setIsDone(false);
      getBegginingCoords({
        url: `https://geocode.search.hereapi.com/v1/geocode?q=${begginingAdress}&apiKey=n-N3M4wpLZuyxAKG0wmFoD-8H3nEPxiXxpmMr3sGfI8`,
      });
      getDestinationCoords({
        url: `https://geocode.search.hereapi.com/v1/geocode?q=${destinationAdress}&apiKey=n-N3M4wpLZuyxAKG0wmFoD-8H3nEPxiXxpmMr3sGfI8`,
      });
    }
  };

  const getBackHandler = (evt) => {
    evt.preventDefault();
    navigate("/");
  };
  const begginingAdressHandler = (evt) => {
    evt.preventDefault();
    setBegginingAdress(evt.target.value);
  };
  const destinationAdressHandler = (evt) => {
    evt.preventDefault();
    setDestinationAdress(evt.target.value);
  };
  const beginFocusHandler = () => {
    setTimeout(() => {
      setBeginFocus(true);
    }, 200);
  };
  const beginBlurHandler = () => {
    setTimeout(() => {
      setBeginFocus(false);
    }, 200);
  };
  const destinationFocusHandler = () => {
    setTimeout(() => {
      setDestinationFocus(true);
    }, 200);
  };
  const destinationBlurHandler = () => {
    setTimeout(() => {
      setDestinationFocus(false);
    }, 200);
  };
  const beginRecentlyPicker = (value) => {
    setBegginingAdress(value);
  };
  const destinationRecentlyPicker = (value) => {
    setDestinationAdress(value);
  };
  return (
    <>
      {!isLoadingBeggining && !isLoadingDestination && isDone && (
        <RouteForm
          submitForm={submitForm}
          begginingAdressHandler={begginingAdressHandler}
          destinationAdressHandler={destinationAdressHandler}
          beginFocusHandler={beginFocusHandler}
          beginBlurHandler={beginBlurHandler}
          beginFocus={beginFocus}
          destinationFocusHandler={destinationFocusHandler}
          destinationBlurHandler={destinationBlurHandler}
          destinationFocus={destinationFocus}
          begginingAdressError={isErrorBegging}
          destinationAdressError={isErrorDestination}
          getBackHandler={getBackHandler}
          disabled={disabled}
          begginingAdress={begginingAdress}
          beginRecentlyPicker={beginRecentlyPicker}
          destinationAdress={destinationAdress}
          destinationRecentlyPicker={destinationRecentlyPicker}
        />
      )}
      {!isDone && <Modal animate />}
    </>
  );
};
export default RouteFormContainer;
