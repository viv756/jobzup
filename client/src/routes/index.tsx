import { BrowserRouter, Route, Routes } from "react-router-dom";

import { authenticationRoutePaths, protectedRoutePaths, publicRoutePaths } from "./common/routes";
import Header from "../components/Header";
import ProtectedRoute from "./Protected.route";
import AuthRoute from "./Auth.route";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/">
          {publicRoutePaths.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        <Route path="/" element={<AuthRoute />}>
          {authenticationRoutePaths.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        <Route element={<ProtectedRoute />}>
          {protectedRoutePaths.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
