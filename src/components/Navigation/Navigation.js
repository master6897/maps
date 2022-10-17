import styled from "styled-components";
import ActiveLink from "../Shared/ActiveLink/ActiveLink";
import { useNavigate } from "react-router-dom";

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
    &:hover {
      cursor: pointer;
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
  const navigate = useNavigate();
  return (
    <StyledNav>
      <div className="logo" onClick={() => navigate("/")}>
        <h1>Maps</h1>
      </div>
      <div className="links">
        <ActiveLink path="/route">Trip</ActiveLink>
      </div>
    </StyledNav>
  );
};
export default Navigation;
