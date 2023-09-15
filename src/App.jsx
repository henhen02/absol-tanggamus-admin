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
import Beranda from "./pages/pages.beranda";
import { Pegawai } from "./pages/pages.pegawai";
import { DaftarPegawai } from "./pages/pages.daftarPegawai";
import { PersisPage } from "./pages/pages.persist";

// create route
const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<PersisPage />}>
        <Route element={<RootElement />}>
          <Route index element={<Beranda />} />
          <Route path="pegawai" element={<Pegawai />}>
            <Route index element={<DaftarPegawai />} />
          </Route>
        </Route>
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
