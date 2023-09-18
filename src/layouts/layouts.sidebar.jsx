import React from "react";
import * as FaIcon from "react-icons/fa";
import { NavLink } from "react-router-dom";
import TanggamusLogo from "../assets/Lambang_Kabupaten_Tanggamus.png";
import { logoutEndpoint } from "../helpers/api";
import { useNotif } from "../hooks/useNotif";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { useUser } from "../hooks/useUser";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const SideBar = () => {
  const { infoNotif, closeNotif, successNotif, errorNotif } = useNotif();

  const axiosPrivate = useAxiosPrivate();
  const { user, setUser } = useUser();
  const notif = withReactContent(Swal);

  const handleLogout = async (e) => {
    e.preventDefault();

    const isConfirm = await notif.fire({
      title: "Apakah anda yakin?",
      text: "Ingin keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Iyaaa",
      cancelButtonText: "Ngga",
      reverseButtons: true,
    });

    if (!isConfirm.isConfirmed) return;

    try {
      infoNotif("loading", "loading");

      const response = await axiosPrivate.post(
        logoutEndpoint,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );

      closeNotif();

      successNotif("Success", response?.data?.message);
      setUser({});
    } catch (error) {
      closeNotif();

      errorNotif("Error", error?.response?.data);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-fit h-screen bg-orange-300 sticky top-0 float-left">
        <div className="flex flex-row items-center justify-center w-full px-10 py-5 space-x-2">
          <figure>
            <img
              className="w-44"
              src={TanggamusLogo}
              alt="Lambang_Kabupaten_Tanggamus.png"
            />
          </figure>
        </div>
        <div className="flex flex-col flex-1 items-start justify-items-start w-full">
          <div className="flex flex-col flex-1 items-start justify-start w-full space-y-5 pt-10 px-5">
            <NavLink
              to={"/"}
              className="flex flex-row items-center justify-start w-full px-5 py-2 gap-3 text-white rounded-md hover:bg-orange-200"
            >
              <FaIcon.FaHome />
              Beranda
            </NavLink>
            <NavLink
              to={"/pegawai"}
              className="flex flex-row items-center justify-start w-full px-5 py-2 gap-3 text-white rounded-md hover:bg-orange-200"
            >
              <FaIcon.FaUsers />
              Pegawai
            </NavLink>
          </div>
          <div className="flex flex-col h-fit w-full justify-start items-start space-y-2 pb-10 px-5">
            <NavLink
              to={"/profil"}
              className="flex flex-row items-center justify-start w-full px-5 py-2 gap-3 text-white rounded-md hover:bg-orange-200"
            >
              <FaIcon.FaUser />
              Profil
            </NavLink>
            <button
              onClick={handleLogout}
              className="flex flex-row items-center justify-start w-full px-5 py-2 gap-3 text-white rounded-md hover:bg-orange-200"
            >
              <FaIcon.FaSignInAlt />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SideBar;
