import { Routes, Route } from "react-router-dom";
import Landing from "../views/Landing";
import DashBoard from "../views/DashBoard";
import { NotFound } from "../views/404";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default Router;
