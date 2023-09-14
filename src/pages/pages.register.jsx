// packages
import React from "react";

// components
import { InputColumn } from "../components/component.input";
import { RegisterButton } from "../components/component.button";

const Register = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen space-y-11 pb-10">
        <div className="flex flex-row items-center justify-center space-x-2 pt-10">
          <figure>
            <img
              className="w-11"
              src="./src/assets/Lambang_Kabupaten_Tanggamus.png"
              alt="Lambang_Kabupaten_Tanggamus.png"
            />
          </figure>
          <div className="text-center">
            <h1 className="text-4xl font-light">TANGGAMUS</h1>
            <h1 className="text-2xl font-bold">ABSENSI ONLINE</h1>
          </div>
        </div>
        <div className="flex flex-col space-y-5 w-96">
          <h1 className="text-xl font-medium">Daftar</h1>
          <InputColumn
            label=""
            type="text"
            placeholder="Nama Lengkap"
            inputname="nama"
          />
          <InputColumn
            label="" // nomor induk pegawai
            type="text"
            placeholder="NIP"
            inputname="nip"
          />
          <InputColumn
            label=""
            type="text"
            placeholder="Email"
            inputname="email"
          />
          <InputColumn
            label=""
            type="password"
            placeholder="Password"
            inputname="password"
          />
          <RegisterButton />
        </div>
        <div className="flex flex-col text-center space-y-10">
          <p className="font-extralight">Sudah punya akun?</p>
          <a className="text-blue-500 font-medium" href="login">
            Login
          </a>
        </div>
      </div>
    </>
  );
};

export default Register;
