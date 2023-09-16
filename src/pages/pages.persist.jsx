import React from "react";
import { useRefresh } from "../hooks/userRefresh";
import { useUser } from "../hooks/useUser";
import { useState } from "react";
import { useEffect } from "react";
import { LoadingPage } from "./pages.loading";
import { Outlet } from "react-router-dom";

export const PersisPage = () => {
  const [loading, setLoading] = useState(true);
  const refresh = useRefresh();
  const { user } = useUser();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await refresh();
      } catch (error) {
        null;
      } finally {
        setLoading(false);
      }
    };

    return () => (!user?.accessToken ? verifyToken() : setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{loading ? <LoadingPage /> : <Outlet />}</>;
};
