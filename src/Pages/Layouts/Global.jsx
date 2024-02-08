import { Outlet } from "react-router-dom";
import Header from "../../Components/Header";

function GlobalLayout({ userInfo }) {
  return (
    <div>
      <Header userInfo={userInfo} />
      <Outlet />
    </div>
  );
}

export default GlobalLayout;
