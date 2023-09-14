import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

// import routes
import { RootElement } from "../src/routes/RootElements";

// import style
import "./App.css";

// import pages
import { Login } from "../src/pages/pages.login";
import { Register } from "../src/pages/pages.register";

// create route
const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootElement />}>
        {}
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
