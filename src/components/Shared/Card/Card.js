import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoad, faRoadCircleCheck } from "@fortawesome/free-solid-svg-icons";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 1rem;
  width: 80%;
  margin: 1rem 0;
  transition: 0.3s;
  font-size: 1.2rem;
  @media (max-width: 480px) {
    flex-direction: column;
  }
  & div {
    width: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 480px) {
      width: 100%;
      &.from {
        margin-bottom: 2rem;
      }
    }
    & span {
      margin-left: 1rem;
    }
  }
  &:hover {
    transform: scale(1.01);
    cursor: pointer;
    -webkit-box-shadow: 2px 6px 23px -8px rgba(66, 68, 90, 1);
    -moz-box-shadow: 2px 6px 23px -8px rgba(66, 68, 90, 1);
    box-shadow: 2px 6px 23px -8px rgba(66, 68, 90, 1);
  }
`;

const Card = (props) => {
  return (
    <StyledContainer>
      <div className="from">
        <FontAwesomeIcon icon={faRoad} />
        <span>From: {props.begin}</span>
      </div>
      <div>
        <FontAwesomeIcon icon={faRoadCircleCheck} />
        <span>To: {props.destination}</span>
      </div>
    </StyledContainer>
  );
};
export default Card;
