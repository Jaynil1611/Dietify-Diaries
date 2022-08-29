import { Navigate, Route } from "react-router";
import { useVideo } from "../../contexts";

function PrivateRoute({ children }) {
  const { token } = useVideo();
  return <>{token ? children : <Navigate replace to="/login" />}</>;
}

export default PrivateRoute;
