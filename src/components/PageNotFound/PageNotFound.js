import Button from "../Shared/Button/Button";
import { useNavigate } from "react-router-dom";
const PageNotFound = () => {
  const navigate = useNavigate();
  const pageNotFoundHandler = () => {
    navigate("/");
  };
  return (
    <>
      <h1>PageNotFound</h1>
      <Button primary value={"Get first trip!"} onClick={pageNotFoundHandler} />
    </>
  );
};
export default PageNotFound;
