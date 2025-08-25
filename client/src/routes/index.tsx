import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  authenticationRoutePaths,
  protectedRoutePaths,
  publicRoutePaths,
  recruiterOnlyRoutePaths,
} from "./common/routes";
import Header from "../components/Header";
import ProtectedRoute from "./Protected.route";
import AuthRoute from "./Auth.route";
import RoleBasedRote from "./RoleBased.route";
import AppLayout from "../layout/AppLayout";

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

        <Route path="/" element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            {protectedRoutePaths.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route>

        <Route path="/" element={<RoleBasedRote allowedRoles={["RECRUITER"]} />}>
          {recruiterOnlyRoutePaths.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
