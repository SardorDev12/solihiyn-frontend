import { Outlet } from "react-router-dom";
import Header from "../../Components/Header";

function GlobalLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
export default GlobalLayout;
