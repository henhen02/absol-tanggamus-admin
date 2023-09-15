import { Navigate, Outlet, useLocation } from "react-router-dom";
import SideBar from "../layouts/layouts.sidebar";

export const RootElement = () => {
  const location = useLocation();

  return (
    <>
      <SideBar />
      <Outlet />
      {/* <Navigate to={"/login"} state={{ from: location }} /> */}
    </>
  );
};
