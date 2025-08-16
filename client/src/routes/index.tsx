import { BrowserRouter, Route, Routes } from "react-router-dom";

import { authenticationRoutePaths, publicRoutePaths } from "./common/routes";
import Header from "../components/Header";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {publicRoutePaths.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        {authenticationRoutePaths.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
