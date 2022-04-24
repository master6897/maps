import styled, { keyframes, css } from "styled-components";

const animate = keyframes`
      0%{
        opacity: 0%;
        transform: translateX(-100vw);
    }
    100%{
        opacity: 100%;
        transform: translateX(0vw);
    }
`;
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 50%;
  position: relative;
  left: 5rem;
  display: none;
  border: 1px solid rgb(118, 118, 118);
  padding: 1.5rem;
  transition: 0.6s;
  transform: translateX(-100vw);
  margin-bottom: 2rem;
  ${(props) =>
    props.focus &&
    css`
      display: flex;
      animation-delay: 0.3s;
      animation: ${animate} 0.3s forwards;
    `}
`;
const StyledParagraph = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  padding: 1rem;
  border-bottom: 1px solid black;
  width: 70%;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.3s;
  ${(props) =>
    props.noValue
      ? css`
          cursor: not-allowed;
        `
      : css`
          &:hover {
            transform: scale(1.05);
          }
        `}
`;
const RecentlySearched = (props) => {
  return (
    <StyledContainer focus={props.focus}>
      {props.recentlyBeginSearched.length > 0 ||
      props.recentlyDestinationSearched.length > 0 ? (
        <>
          <h1>Recently searched:</h1>
          {props.begin
            ? props.recentlyBeginSearched.map((element, index) => {
                return (
                  <StyledParagraph
                    key={index}
                    onClick={() => props.beginRecentlyPicker(element)}
                  >
                    {element}
                  </StyledParagraph>
                );
              })
            : props.recentlyDestinationSearched.map((element, index) => {
                return (
                  <StyledParagraph
                    key={index}
                    onClick={() => props.destinationRecentlyPicker(element)}
                  >
                    {element}
                  </StyledParagraph>
                );
              })}
        </>
      ) : (
        <StyledParagraph noValue>No searching recently</StyledParagraph>
      )}
    </StyledContainer>
  );
};
export default RecentlySearched;
