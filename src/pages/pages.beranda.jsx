import React from "react";
import { daftarJadwal } from "../dump/daftarJadwal";
import {
  DeleteButton,
  DetailButton,
  EditButton,
} from "../components/component.button";

const Beranda = () => {
  return (
    <>
      <div className="flex flex-col items-start justify-items-start min-h-screen pl-3 pt-3 pr-3">
        <table className="table-auto w-full">
          <caption className="font-bold text-xl pb-5">
            Daftar Jadwal Absen Pegawai Pemda Tanggamus
          </caption>
          <thead>
            <tr>
              <th className="py-2 bg-orange-400 font-semibold text-white">
                No
              </th>
              <th className="py-2 bg-orange-400 font-semibold text-white">
                Tanggal
              </th>
              <th className="py-2 bg-orange-400 font-semibold text-white">
                Jam Masuk
              </th>
              <th className="py-2 bg-orange-400 font-semibold text-white">
                Jam Batas
              </th>
              <th className="py-2 bg-orange-400 font-semibold text-white">
                Jam Keluar
              </th>
              <th className="py-2 bg-orange-400 font-semibold text-white">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {daftarJadwal.map((jadwal, index) => {
              return (
                <tr className="even:bg-orange-100" key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{jadwal.tanggal}</td>
                  <td className="text-center">{jadwal.jamMasuk}</td>
                  <td className="text-center">{jadwal.jamBatas}</td>
                  <td className="text-center">{jadwal.jamKeluar}</td>
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

export default Beranda;
