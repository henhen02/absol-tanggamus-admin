import {
  DeleteButton,
  DetailButton,
  EditButton,
} from "../components/component.button";
import { useAbsen } from "../hooks/useAbsen";
import {
  compareTime,
  convertDate,
  convertDateForIinput,
  convertTime,
  convertTimewithReducer,
} from "../helpers/convertDate";
import { useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Button,
} from "@material-tailwind/react";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { useNotif } from "../hooks/useNotif";
import { allAbsenEndpoint } from "../helpers/api";
import { useUser } from "../hooks/useUser";
import { mutate } from "swr";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Beranda = () => {
  const { data, error, isLoading } = useAbsen();

  const { user } = useUser();

  const [dataInput, setData] = useState({
    tanggal: new Date().toISOString(),
    jamMasuk: "08:00",
    jamBatas: "2",
    jamKeluar: "17:00",
  });

  const axiosPrivate = useAxiosPrivate();
  const notif = withReactContent(Swal);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const { successNotif, closeNotif, errorNotif, loadingNotif } = useNotif();

  const hancleChange = (e) => {
    setData({ ...dataInput, [e.target.name]: e.target.value });
  };

  const handleTambahAbsen = async () => {
    handleOpen();
    if (
      !compareTime(dataInput.jamMasuk, dataInput.jamBatas, dataInput.jamKeluar)
    ) {
      errorNotif("Error", "Jam Keluar tidak boleh lebih kecil dari jam masuk");
      return;
    }
    try {
      loadingNotif();
      const convertedDataInput = convertDateForIinput(
        dataInput.tanggal,
        dataInput.jamMasuk,
        dataInput.jamBatas,
        dataInput.jamKeluar
      );

      await axiosPrivate.post(allAbsenEndpoint, convertedDataInput, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });

      mutate(allAbsenEndpoint);

      closeNotif();
      successNotif("Success", "Absen Berhasil Ditambahkan");
    } catch (error) {
      console.log(error);
      closeNotif();
      errorNotif("Error", error.response.data.message);
    }
  };

  const handleDeleteAbsen = async (id) => {
    try {
      loadingNotif();
      await axiosPrivate.delete(`${allAbsenEndpoint}/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });

      mutate(allAbsenEndpoint);

      closeNotif();

      successNotif("Success", "Absen Berhasil Dihapus");
    } catch (error) {
      closeNotif();
      errorNotif("Error", error.message);
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
        <h1 className="font-bold text-xl pb-5 mt-9">DAFTAR JADWAL ABSEN</h1>
        <div className="">
          <div className="flex items-center gap-3 mb-4">
            <button
              className="bg-green-500 px-8 py-2 text-white rounded-full hover:bg-green-600 transition-all"
              onClick={handleOpen}
            >
              Tambah Absen
            </button>
          </div>
          <table className="table-auto w-full">
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
              {data.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center">
                    Tidak ada data
                  </td>
                </tr>
              )}

              {data.map((jadwal, index) => {
                return (
                  <tr className="even:bg-orange-100" key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">
                      {convertDate(jadwal?.tanggal)}
                    </td>
                    <td className="text-center">
                      {convertTime(jadwal.jamMasuk)}
                    </td>
                    <td className="text-center">
                      {convertTime(jadwal.jamBatas)}
                    </td>
                    <td className="text-center">
                      {convertTime(jadwal.jamKeluar)}
                    </td>
                    <td className="flex flex-row justify-center gap-3 py-1">
                      <DetailButton />
                      <EditButton />
                      <DeleteButton
                        action={() => {
                          notif
                            .fire({
                              title: "Apakah anda yakin?",
                              text: "Yakin ingin menghapus absen ini?",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonText: "Iyaaa",
                              cancelButtonText: "Ngga",
                              reverseButtons: true,
                            })
                            .then((result) => {
                              if (result.isConfirmed) {
                                handleDeleteAbsen(jadwal.id);
                              }
                            });
                        }}
                      />
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
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label htmlFor="jamMasuk" className="text-left">
                Tanggal
              </label>
              <input
                type="text"
                disabled
                defaultValue={convertDate(dataInput?.tanggal)}
                className="border-2 border-gray-300 p-2 rounded-md cursor-not-allowed"
                name="tanggal"
                id="tanggal"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="jamMasuk" className="text-left">
                Jam Masuk
              </label>
              <input
                type="time"
                className="border-2 border-gray-300 p-2 rounded-md"
                name="jamMasuk"
                value={dataInput?.jamMasuk}
                onChange={hancleChange}
                id="jamMasuk"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="jamBatas" className="text-left">
                Batas Absen
              </label>
              <p>
                {convertTimewithReducer(dataInput.jamMasuk, dataInput.jamBatas)}
              </p>
              <input
                type="range"
                className="border-2 border-gray-300 p-2 rounded-md"
                name="jamBatas"
                id="jamBatas"
                min={1}
                max={10}
                step={1}
                value={dataInput?.jamBatas}
                onChange={hancleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="jamKeluar" className="text-left">
                Jam Keluar
              </label>
              <input
                type="time"
                className="border-2 border-gray-300 p-2 rounded-md"
                name="jamKeluar"
                id="jamKeluar"
                value={dataInput?.jamKeluar}
                onChange={hancleChange}
              />
            </div>
          </div>
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
          <Button variant="gradient" color="green" onClick={handleTambahAbsen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Beranda;
