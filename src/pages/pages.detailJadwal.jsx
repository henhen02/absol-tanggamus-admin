// packages
import React from "react";
import { useAllUser } from "../hooks/useAllUser";
import { useAbsen } from "../hooks/useAbsen";
import { useParams } from "react-router-dom";
import { convertDate, convertTime } from "../helpers/convertDate";
import { Chip } from "@material-tailwind/react";

export const DetailJadwal = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useAbsen(id);

  const headerTable = ["No", "Nama", "NIP", "Jam Absen", "Status"];

  const switchChipsColor = (status) => {
    switch (status) {
      case 1:
        return "blue";
      case 2:
        return "green";
      case 3:
        return "amber";
      case 4:
        return "red";
      case 5:
        return "cyan";
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
  console.log(data);

  return (
    <>
      <div className="w-4/5">
        <h1 className="mt-10 text-xl font-bold">DETAIL ABSEN</h1>
        <table className="mt-3 table-auto w-72 min-w-max  ">
          <tbody>
            <tr>
              <td>Tanggal</td>
              <td>:</td>
              <td>{convertDate(data?.tanggal)}</td>
            </tr>
            <tr>
              <td>Jam Masuk</td>
              <td>:</td>
              <td>{convertTime(data?.jamMasuk)}</td>
            </tr>
            <tr>
              <td>Jam Batas</td>
              <td>:</td>
              <td>{convertTime(data?.jamBatas)}</td>
            </tr>
            <tr>
              <td>Jam Keluar</td>
              <td>:</td>
              <td>{convertTime(data?.jamKeluar)}</td>
            </tr>
          </tbody>
        </table>

        <h1 className="mt-10 text-xl font-bold">DAFTAR USER</h1>

        <table className="mt-3 table-auto w-full">
          <thead>
            <tr>
              {headerTable.map((header, index) => (
                <th
                  key={index}
                  className="py-2 bg-orange-400 font-semibold text-white"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.history?.lenght === 0 && (
              <tr>
                <td colSpan={6} className="text-center">
                  Tidak ada data
                </td>
              </tr>
            )}

            {data?.history.map((user, index) => {
              return (
                <tr className="even:bg-orange-100" key={index}>
                  <td className="text-center py-2">{index + 1}</td>
                  <td className="text-center py-2">{user?.user?.nama}</td>
                  <td className="text-center py-2">{user?.user?.nip}</td>
                  <td className="text-center py-2">
                    {user?.jamAbsen ? convertTime(user?.jamAbsen) : "-"}
                  </td>
                  <td className="text-center py-2 w-10 ">
                    <Chip
                      value={user?.statusAbsen?.keterangan}
                      color={switchChipsColor(user?.statusAbsen?.id)}
                    />
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
