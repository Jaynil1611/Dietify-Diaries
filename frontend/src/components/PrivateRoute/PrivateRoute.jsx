import { Navigate, Route } from "react-router";

function PrivateRoute({ token, path, element }) {
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
