import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/user-profile";
import SingleJob from "./pages/Single-job";

const App = () => {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/sign-up" element={<SignUp />} />
    //   </Routes>
    // </BrowserRouter>
    <div>
      <UserProfile />
      <SingleJob/>
    </div>
  );
};

export default App;
