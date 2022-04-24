import styled from "styled-components";
import RouteFormContainer from "./RouteFormContainer";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 6rem;
`;
const UserRoute = () => {
  return (
    <StyledContainer>
      <RouteFormContainer />
    </StyledContainer>
  );
};
export default UserRoute;
