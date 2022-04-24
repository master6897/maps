import styled from "styled-components";
import ActiveLink from "../Shared/ActiveLink/ActiveLink";

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 5rem;
  background-color: purple;
  color: white;
  & div.logo {
    width: 40%;
    & h1 {
      font-weight: 600;
      font-size: 1.5rem;
    }
  }
  & div.links {
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;

const Navigation = () => {
  return (
    <StyledNav>
      <div className="logo">
        <h1>Maps</h1>
      </div>
      <div className="links">
        <ActiveLink path="/route">Trip</ActiveLink>
      </div>
    </StyledNav>
  );
};
export default Navigation;
