import useSWR from "swr";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { allAbsenEndpoint } from "../helpers/api";
import { useUser } from "./useUser";

export const useAbsen = (absenId) => {
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

  if (absenId) {
    const { data, error, isLoading } = useSWR(
      `${allAbsenEndpoint}/${absenId}`,
      fetcher
    );

    return { data, error, isLoading };
  }

  const { data, error, isLoading } = useSWR(allAbsenEndpoint, fetcher);

  return { data, error, isLoading };
};
