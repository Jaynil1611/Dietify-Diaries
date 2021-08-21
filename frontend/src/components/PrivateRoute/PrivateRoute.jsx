import { Navigate, Route } from "react-router";
import { useVideo } from "../../contexts";

function PrivateRoute({ path, element }) {
  const {token} = useVideo()
  return (
    <>
      {token ? (
        <Route element={element} path={path} />
      ) : (
        <Navigate replace to="/login" />
      )}
    </>
  );
}

export default PrivateRoute;
