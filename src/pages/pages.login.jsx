import { InputColumn } from "../components/component.input";
import { LoginButton } from "../components/component.button";
import { useEffect } from "react";
import { useRefresh } from "../hooks/userRefresh";
import { LoadingPage } from "./pages.loading";
import { useState } from "react";
import { useUser } from "../hooks/useUser";
import { axiosInstance } from "../helpers/axiosHelper";
import { loginEndpoint } from "../helpers/api";

import { Navigate } from "react-router-dom";
import { useNotif } from "../hooks/useNotif";

export const Login = () => {
  const refresh = useRefresh();
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);

  const { infoNotif, successNotif, closeNotif, errorNotif } = useNotif();

  const [dataInput, setDataInput] = useState({
    nip: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      infoNotif("loading", "loading");

      const response = await axiosInstance.post(loginEndpoint, dataInput, {
        withCredentials: true,
      });
      closeNotif();

      successNotif("Success", "Login Success");
      setUser(response.data);
    } catch (error) {
      closeNotif();

      errorNotif("Error", "Login Failed");
    }
  };

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

  return loading ? (
    <LoadingPage />
  ) : !user?.accessToken ? (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen -mt-20 space-y-11 pb-10">
        <div className="flex flex-row items-center justify-center space-x-2">
          <figure>
            <img
              className="w-60"
              src="./src/assets/Lambang_Kabupaten_Tanggamus.png"
              alt="Lambang_Kabupaten_Tanggamus.png"
            />
          </figure>
        </div>
        <form className="flex flex-col space-y-5 w-96" onSubmit={handleSubmit}>
          <h1 className="text-xl font-medium">Login Admin</h1>
          <InputColumn
            type="number"
            placeholder="NIP"
            inputname="nip"
            action={(e) => {
              setDataInput({
                ...dataInput,
                [e.target.name]: e.target.value,
              });
            }}
          />
          <InputColumn
            type="password"
            placeholder="Password"
            inputname="password"
            action={(e) => {
              setDataInput({
                ...dataInput,
                [e.target.name]: e.target.value,
              });
            }}
          />
          <LoginButton />
        </form>
      </div>
    </>
  ) : (
    <Navigate to={"/"} replace />
  );
};
