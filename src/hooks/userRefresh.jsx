import { refreshEndpoint } from "../helpers/api";
import { axiosInstance } from "../helpers/axiosHelper";
import { useUser } from "./useUser";

export const useRefresh = () => {
  const { setUser } = useUser();

  const refresh = async () => {
    const response = await axiosInstance.get(refreshEndpoint, {
      withCredentials: true,
    });

    setUser({
      accessToken: response.data?.accessToken,
    });

    return response.data?.accessToken;
  };

  return refresh;
};
