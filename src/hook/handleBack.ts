import { useNavigate } from "react-router";

const navigate = useNavigate();

const handleBack = () => {
  navigate(-1);
};
export default handleBack