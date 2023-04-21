import { SideBar } from "Layouts";
import { Outlet } from "react-router-dom";
import "../../../Assets/Styles/Layout/MainAdmin/index.scss";
export const AdminMain = () => {
  return (
    <div className="adminMain">
      <div className="flex j-c gap-3  mt-5">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};
