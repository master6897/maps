import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import styled from "styled-components";
import Button from "../Shared/Button/Button";
import PdfGenerator from "../PdfGenerator/PdfGenerator";
import { useState } from "react";
import Modal from "../Shared/Modal/Modal";
import { useEffect } from "react";
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  @media (max-width: 480px) {
    width: 100%;
  }
  & div {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin: 1rem 0;
    @media (max-width: 480px) {
      flex-direction: column;
    }
    &.title {
      width: 70%;
      align-items: flex-start;
      text-align: left;
      @media (max-width: 480px) {
        align-items: flex-start;
        text-align: left;
      }
    }
    &.details {
      width: 30%;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
      @media (max-width: 480px) {
        align-items: flex-start;
        text-align: left;
      }
    }

    &.buttons {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 50%;
      margin: 1rem 0;
      @media (max-width: 480px) {
        width: 90%;
        flex-direction: row;
      }
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
      }
    }
  }
`;

const StyledPDFViewer = styled(PDFViewer)`
  width: 80%;
  height: 90vh;
  @media (max-width: 1279px) {
    display: none;
  }
`;
const TripDetails = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, [loading]);

  useEffect(() => {
    setLoading(true);
  }, [props.costs]);
  return (
    <StyledContainer>
      <div className="title">
        <label>Costs per kilometer:</label>
        <input
          type="text"
          onChange={(evt) => props.getPrice(evt.target.value)}
          value={props.price}
        />
      </div>
      <div className="details">
        <p>Costs: {props.costs.toFixed(2)}$</p>
        <p>
          Days: {props.days.toFixed(0)}{" "}
          {props.days.toFixed(0) > 1 ? "- because of limit 800km per day" : ""}
        </p>
        <p>
          {props.hours} hours {props.minutes} minutes
        </p>
      </div>
      {+props.price > 0 && loading && <Modal animate />}
      {!loading && +props.price > 0 && (
        <StyledPDFViewer showToolbar>
          <PdfGenerator
            beginAdress={props.beginAdress}
            destinationAdress={props.destinationAdress}
            costs={props.costs.toFixed(2)}
            days={props.days.toFixed(0)}
            hours={props.hours}
            minutes={props.minutes}
            instructions={props.instructions}
            distance={props.distance}
            setLoading={setLoading}
          />
        </StyledPDFViewer>
      )}
      <div className="buttons">
        {+props.price === 0 ? (
          <Button
            primary
            value={"Generate PDF"}
            onClick={props.getBackHandler}
            disabled
          />
        ) : (
          <PDFDownloadLink
            document={
              <PdfGenerator
                beginAdress={props.beginAdress}
                destinationAdress={props.destinationAdress}
                costs={props.costs.toFixed(2)}
                days={props.days.toFixed(0)}
                hours={props.hours}
                minutes={props.minutes}
                instructions={props.instructions}
                distance={props.distance}
                setLoading={setLoading}
              />
            }
            filename="tripDetails.pdf"
          >
            {({ loading }) =>
              loading ? (
                <Button primary value={"PDF getting ready"} disabled />
              ) : (
                <Button primary value={"Download PDF"} />
              )
            }
          </PDFDownloadLink>
        )}
        <Button secondary value={"Back"} onClick={props.getBackHandler} />
        {props.isAlternative && (
          <Button
            secondary
            value={"Pick alternatrive"}
            onClick={props.alternativeHandler}
          />
        )}
      </div>
    </StyledContainer>
  );
};
export default TripDetails;
