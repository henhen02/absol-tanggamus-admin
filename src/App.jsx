import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

// import routes
import { RootElement } from "../src/routes/RootElements";

// import pages
import { Login } from "../src/pages/pages.login";
import { Register } from "../src/pages/pages.register";
import { Profil } from "./pages/pages.profil";
import { DaftarJadwal } from "./pages/pages.daftarjadwal";
import { DetailJadwal } from "./pages/pages.detailJadwal";
import { Pegawai } from "./pages/pages.pegawai";
import { DaftarPegawai } from "./pages/pages.daftarPegawai";
import { DetailPegawai } from "./pages/pages.detailPegawai";

// create route
const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootElement />}>
        <Route index element={<DaftarJadwal />} />
        <Route path=":id" element={<DetailJadwal />} />
        <Route path="pegawai" element={<Pegawai />}>
          <Route index element={<DaftarPegawai />} />
          <Route path=":id" element={<DetailPegawai />} />
        </Route>
        <Route path="profil" element={<Profil />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </>
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
};

export default App;
