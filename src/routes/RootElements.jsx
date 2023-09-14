import { Navigate, Outlet, useLocation } from "react-router-dom";

export const RootElement = () => {
  const location = useLocation();

  return (
    <>
      <Navigate to={"/login"} state={{ from: location }} />
    </>
  );
};
