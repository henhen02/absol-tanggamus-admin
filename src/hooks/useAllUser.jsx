import useSWR from "swr";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { allAbsenEndpoint, allUserEndpoint } from "../helpers/api";
import { useUser } from "./useUser";

export const useAllUser = () => {
  const axiosPrivate = useAxiosPrivate();

  const { user } = useUser();

  const fetcher = async (url) => {
    const response = await axiosPrivate.get(url, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response.data?.data;
  };
  const { data, error, isLoading } = useSWR(allUserEndpoint, fetcher);

  return { data, error, isLoading };
};
