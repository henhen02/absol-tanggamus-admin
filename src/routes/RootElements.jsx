import { Navigate, Outlet, useLocation } from "react-router-dom";
import SideBar from "../layouts/layouts.sidebar";
import { useUser } from "../hooks/useUser";

export const RootElement = () => {
  const location = useLocation();

  const { user } = useUser();

  return user?.accessToken ? (
    <>
      <SideBar />
      <div className="flex flex-col items-center justify-items-center min-h-screen pl-3 pt-3 pr-3">
        <Outlet />
      </div>
      {/* <Navigate to={"/login"} state={{ from: location }} /> */}
    </>
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};
