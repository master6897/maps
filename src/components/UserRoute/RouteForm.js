import styled from "styled-components";
import RecentlySearchedContainer from "../RecenttlySearched/RecentlySearchContainer";
import Button from "../Shared/Button/Button";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70%;
  padding: 1rem;
  box-sizing: border-box;
  @media (max-width: 480px) {
    flex-direction: column;
  }
  & div.buttons {
    display: flex;
    width: 50%;
    align-items: center;
    justify-content: space-around;
    @media (max-width: 480px) {
      display: flex;
      flex-direction: row;
    }
  }
  & div.container {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin: 1rem 0;
    @media (max-width: 480px) {
      flex-direction: column;
    }
    & label {
      width: 30%;
      font-weight: 500;
      font-size: 1.2rem;
      text-align: left;
      @media (max-width: 480px) {
        width: 90%;
        margin-bottom: 0.5rem;
      }
    }
    & input {
      width: 70%;
      padding: 0.4rem;
      font-size: 1.1rem;
      border: 1ps solid black;
      outline: none;
      @media (max-width: 480px) {
        width: 90%;
        margin-bottom: 0.5rem;
      }
    }
    &.error {
      & input {
        border: 1px solid red;
      }
    }
  }
  & p {
    color: red;
  }
`;
const RouteForm = (props) => {
  return (
    <StyledForm onSubmit={props.submitForm}>
      <div className={props.disabled ? "container error" : "container"}>
        <label>Begin Adress:</label>
        <input
          type="text"
          value={props.begginingAdress}
          onChange={(evt) => props.begginingAdressHandler(evt)}
          onFocus={props.beginFocusHandler}
          onBlur={props.beginBlurHandler}
        />
      </div>
      <RecentlySearchedContainer
        focus={props.beginFocus}
        begin
        beginRecentlyPicker={(value) => props.beginRecentlyPicker(value)}
      />
      {props.disabled && <p>Enter valid adress</p>}
      <div className={props.disabled ? "container error" : "container"}>
        <label>Destination Adress:</label>
        <input
          type="text"
          value={props.destinationAdress}
          onChange={(evt) => props.destinationAdressHandler(evt)}
          onFocus={props.destinationFocusHandler}
          onBlur={props.destinationBlurHandler}
        />
      </div>
      <RecentlySearchedContainer
        focus={props.destinationFocus}
        destinationRecentlyPicker={(value) =>
          props.destinationRecentlyPicker(value)
        }
      />
      {props.disabled && <p>Enter valid destination adress</p>}
      <div className="buttons">
        <Button primary value={"Get route"} type="submit" />
        <Button
          secondary
          value={"Back"}
          onClick={(evt) => props.getBackHandler(evt)}
        />
      </div>
    </StyledForm>
  );
};
export default RouteForm;
