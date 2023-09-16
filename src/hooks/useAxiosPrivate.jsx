import { useEffect } from "react";
import { axiosPrivateInstance } from "../helpers/axiosHelper";
import { useRefresh } from "./userRefresh";
import { useUser } from "./useUser";

export const useAxiosPrivate = () => {
  const refresh = useRefresh();

  const { user } = useUser();

  useEffect(() => {
    const requestInterceptor = axiosPrivateInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${user?.accessToken}`;
        }

        return config;
      },
      (err) => Promise.reject(err)
    );

    const responseInterceptor = axiosPrivateInstance.interceptors.response.use(
      (res) => res,
      async (err) => {
        try {
          const originalRequest = err?.config;
          if (err?.response?.status === 401 && !originalRequest.sent) {
            originalRequest.sent = true;
            const accessToken = await refresh();
            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
            return axiosPrivateInstance(originalRequest);
          }
          return Promise.reject(err);
        } catch (error) {
          console.log(error);
          return Promise.reject(error);
        }
      }
    );

    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestInterceptor);
      axiosPrivateInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, refresh]);

  return axiosPrivateInstance;
};
