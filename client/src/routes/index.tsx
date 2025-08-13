import { BrowserRouter, Route, Routes } from "react-router-dom";
import { authenticationRoutePaths, publicRoutePaths } from "./common/routes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutePaths.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>

      <Routes>
        {authenticationRoutePaths.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
