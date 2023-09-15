import React from "react";
import * as FaIcon from "react-icons/fa";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-fit h-screen bg-orange-300 sticky top-0 float-left">
        <div className="flex flex-row items-center justify-center w-full px-10 py-5 space-x-2">
          <figure>
            <img
              className="w-10"
              src="./src/assets/Lambang_Kabupaten_Tanggamus.png"
              alt="Lambang_Kabupaten_Tanggamus.png"
            />
          </figure>
          <div className="text-center">
            <h1 className="text-xl font-bold">TANGGAMUS</h1>
            <h1 className="font-light">ABSENSI ONLINE</h1>
          </div>
        </div>
        <div className="flex flex-col flex-1 items-start justify-items-start w-full">
          <div className="flex flex-col items-start justify-center w-full h-fit space-y-5 pt-10 px-5">
            <NavLink
              to={"/"}
              className="flex flex-row items-center justify-start w-full px-5 py-2 gap-3 text-white rounded-md focus:bg-orange-500 active:bg-orange-500 hover:bg-orange-200"
            >
              <FaIcon.FaHome />
              Beranda
            </NavLink>
            <NavLink
              to={"/pegawai"}
              className="flex flex-row items-center justify-start w-full px-5 py-2 gap-3 text-white rounded-md focus:bg-orange-500 active:bg-orange-500 hover:bg-orange-200"
            >
              <FaIcon.FaUsers />
              Pegawai
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
export default SideBar;
