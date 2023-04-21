import { Input, Logo, SearchBox_fashion } from "Components";
import { BsHeart } from "react-icons/bs";
import { IoBagOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";

import "../../../Assets/Styles/Layout/HeaderAdmin/index.scss";
export const AdminHeader = () => {
  return (
    <header>
    <div className="header-right">
     <Logo/>

    </div>
    <div className="header-left">
      <VscAccount size="2.3rem" color="gray"  className="header-left__icon" />
      <p className="header-left__p">ورود / ثبت نام</p>
      <div className="line-h"></div>
      <BsHeart size="1.8rem"color="gray" className="header-left__icon" />
      <div className="line-h"></div>
      <IoBagOutline size="1.8rem" color="gray" className="header-left__icon"/>

   
    </div>
  </header>
  );
};
