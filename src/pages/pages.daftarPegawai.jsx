import React from "react";
import { daftarPegawai } from "../dump/daftarPegawai";
import {
  DetailButton,
  DeleteButton,
  EditButton,
} from "../components/component.button";

// no nip nama email action

export const DaftarPegawai = () => {
  return (
    <>
      <div className="flex flex-col items-start justify-items-start min-h-screen pl-3 pt-3 pr-3">
        <table className="table-auto w-full">
          <caption className="font-bold text-xl pb-5">
            Daftar Pegawai Pemda Tanggamus
          </caption>
          <thead>
            <tr>
              <th className="py-2 bg-orange-400 font-semibold text-white">
                No
              </th>
              <th className="py-2 bg-orange-400 font-semibold text-white">
                NIP
              </th>
              <th className="py-2 bg-orange-400 font-semibold text-white text-left">
                Nama
              </th>
              <th className="py-2 bg-orange-400 font-semibold text-white text-left">
                Email
              </th>
              <th className="py-2 bg-orange-400 font-semibold text-white">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {daftarPegawai?.map((item, index) => {
              return (
                <tr className="even:bg-orange-100" key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{item.nip}</td>
                  <td>{item.nama}</td>
                  <td>{item.email}</td>
                  <td className="flex flex-row items-center justify-center p-1 space-x-4">
                    <DetailButton />
                    <EditButton />
                    <DeleteButton />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
