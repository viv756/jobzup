import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  authenticationRoutePaths,
  protectedRoutePaths,
  publicRoutePaths,
  recruiterOnlyRoutePaths,
} from "./common/routes";
import ProtectedRoute from "./Protected.route";
import AuthRoute from "./Auth.route";
import BaseLayout from "../layout/BaseLayout";
import AppLayout from "../layout/AppLayout";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route element={<BaseLayout />}>
            {publicRoutePaths.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>
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

            <Route path="/" element={<ProtectedRoute allowedRoles={["RECRUITER"]} />}>
              {recruiterOnlyRoutePaths.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
            </Route>
          </Route>
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
