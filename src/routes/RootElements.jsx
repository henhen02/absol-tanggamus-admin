import { Navigate, Outlet, useLocation } from "react-router-dom";
import SideBar from "../layouts/layouts.sidebar";
import { useUser } from "../hooks/useUser";

export const RootElement = () => {
  const location = useLocation();

  const { user } = useUser();

  return user?.accessToken ? (
    <>
      <SideBar />
      <Outlet />
      {/* <Navigate to={"/login"} state={{ from: location }} /> */}
    </>
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};
