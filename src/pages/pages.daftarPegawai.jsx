// import packages
import React from "react";
import { useNavigate } from "react-router-dom";

import {
  DetailButton,
  DeleteButton,
  EditButton,
} from "../components/component.button";
import { usePegawai } from "../hooks/usePegawai";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { Chip } from "@material-tailwind/react";
import { useRef } from "react";
import { addUserEndpoint, allUserEndpoint } from "../helpers/api";
import { axiosInstance } from "../helpers/axiosHelper";
import { useNotif } from "../hooks/useNotif";
import { useUser } from "../hooks/useUser";
import { mutate } from "swr";

export const DaftarPegawai = () => {
  const navigate = useNavigate();

  const { data, error, isLoading } = usePegawai();
  const { successNotif, closeNotif, errorNotif, loadingNotif } = useNotif();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const formRef = useRef();

  const { user } = useUser();

  const header = ["No", "NIP", "Nama", "Role", "Aksi"];

  const [dataInput, setDataInput] = useState({
    nip: "",
    nama: "",
    email: "",
    password: "12345678",
    role: "USER",
  });

  const roles = ["USER", "ADMIN"];

  const hancleChange = (e) => {
    setDataInput({ ...dataInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleOpen();
    try {
      loadingNotif();
      await axiosInstance.post(addUserEndpoint, dataInput, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      closeNotif();
      successNotif("Success", "Berhasil menambahkan pegawai");
      mutate(allUserEndpoint);
      setDataInput({
        nip: "",
        nama: "",
        email: "",
        password: "12345678",
        role: "USER",
      });
    } catch (error) {
      closeNotif();
      errorNotif("Error", error?.response?.data?.message);
    }
  };

  const switchChipsColor = (role) => {
    switch (role) {
      case "ADMIN":
        return "blue";
      case "USER":
        return "green";
      default:
        return "black";
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      <div className="w-4/5">
        <h1 className="font-bold text-xl pb-5 mt-9">DAFTAR PEGAWAI</h1>
        <div className="">
          <div className="flex items-center gap-3 mb-4">
            <button
              className="bg-green-500 px-8 py-2 text-white rounded-full hover:bg-green-600 transition-all"
              onClick={handleOpen}
            >
              Tambah Pegawai
            </button>
          </div>
          <table className="table-auto w-full">
            <thead>
              <tr>
                {header.map((item, index) => {
                  return (
                    <th
                      key={index}
                      className="py-2 bg-orange-400 font-semibold text-white"
                    >
                      {item}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center">
                    Tidak ada data
                  </td>
                </tr>
              )}
              {data.map((user, index) => {
                return (
                  <tr className="even:bg-orange-100" key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">
                      {user?.nip ? user?.nip : "-"}
                    </td>
                    <td className="text-center">
                      {user?.nama ? user?.nama : "-"}
                    </td>
                    <td className="text-center" key={index}>
                      {" "}
                      <div className="flex gap-3 justify-center ">
                        {user?.role?.map((role, index) => {
                          return (
                            <Chip
                              key={index}
                              value={role?.role}
                              color={switchChipsColor(role?.role)}
                            />
                          );
                        })}{" "}
                      </div>
                    </td>
                    <td className="flex flex-row justify-center gap-3 py-1">
                      <DetailButton
                        action={() => {
                          navigate(`/${jadwal.id}`);
                        }}
                      />
                      <DeleteButton />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Dialog open={open} handler={handleOpen} size="sm">
        <DialogHeader>Tambah Absen</DialogHeader>
        <DialogBody divider>
          <form
            className="flex flex-col gap-3"
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col">
              <label htmlFor="nama" className="text-left">
                Nama
              </label>
              <input
                required
                type="text"
                defaultValue={dataInput?.nama}
                className="border-2 border-gray-300 p-2 rounded-md"
                name="nama"
                id="nama"
                onChange={hancleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="nip" className="text-left">
                NIP
              </label>
              <input
                required
                type="number"
                className="border-2 border-gray-300 p-2 rounded-md"
                name="nip"
                value={dataInput?.nip}
                onChange={hancleChange}
                id="nip"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-left">
                Email
              </label>
              <input
                required
                type="email"
                className="border-2 border-gray-300 p-2 rounded-md"
                name="email"
                value={dataInput?.email}
                onChange={hancleChange}
                id="email"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-left">
                Password
              </label>
              <input
                required
                type="password"
                className="border-2 border-gray-300 p-2 rounded-md"
                name="password"
                value={dataInput?.password}
                onChange={hancleChange}
                id="password"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="role" className="text-left">
                Role
              </label>
              <select
                className="border-2 border-gray-300 p-2 rounded-md"
                name="role"
                value={dataInput?.role}
                onChange={hancleChange}
                id="role"
              >
                {roles.map((role, index) => {
                  return (
                    <option key={index} value={role}>
                      {role}
                    </option>
                  );
                })}
              </select>
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              formRef.current.requestSubmit();
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
