import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  authenticationRoutePaths,
  baseRoutePaths,
  protectedRoutePaths,
  publicRoutePaths,
  recruiterOnlyRoutePaths,
} from "./common/routes";
import ProtectedRoute from "./Protected.route";
import AuthRoute from "./Auth.route";
import BaseLayout from "../layout/BaseLayout";
import AppLayout from "../layout/AppLayout";

import NotFound from "../pages/not-found";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route path="/">
          <Route element={<BaseLayout />}>
            {publicRoutePaths.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route>

        {/* authentication routes */}
        <Route path="/" element={<AuthRoute />}>
          {authenticationRoutePaths.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        {/* protected routes. only logined users can access it */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            {protectedRoutePaths.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}

            {/* only recruiter can access these routes */}
            <Route element={<ProtectedRoute allowedRoles={["RECRUITER"]} />}>
              {recruiterOnlyRoutePaths.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
            </Route>
          </Route>
        </Route>

        <Route path="/" element={<ProtectedRoute />}>
          <Route element={<BaseLayout />}>
            {baseRoutePaths.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
