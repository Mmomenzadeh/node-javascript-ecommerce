import { FaRegUser } from "react-icons/fa";
import { MdAccountCircle, MdOutlineInventory } from "react-icons/md";
import {
  TbBookmarks,
  TbCategory,
  TbFileInvoice,
  TbReportSearch,
} from "react-icons/tb";
import { TfiComments } from "react-icons/tfi";
import { NavLink } from "react-router-dom";
import "../../Assets/Styles/Layout/SideBar/index.scss";
import { IoStorefrontSharp } from "react-icons/io5";
import { SlSettings } from "react-icons/sl";
import { BiSupport } from "react-icons/bi";
import { PANLEMANAGEMENT_ORDERS } from "Config";
import { PANLEMANAGEMENT_STOCK } from "Config";
import { PANLEMANAGEMENT } from "Config";
export const SideBar = () => {
  return (
    <div className="sideBar">
      <div className="sideBar__account">
        <MdAccountCircle className="sideBar__account__icon" />
        <div className="flex col gap-1">
          <span className="sideBar__account__txt-one">مهسا مومن زاده</span>
          <span className="sideBar__account__txt-sec">Admin</span>
        </div>
      </div>

      <NavLink  to="/managementPanle" className={(navData)=>navData.isActive ? "sideBar__item  sideBar-active" : "sideBar__item"}>
        <TbFileInvoice className="sideBar__item__icon" />
        <span className="sideBar__item__title"> مدیریت سفارش ها</span>
      </NavLink>

      <NavLink to="/managementPanle/products"  className={(navData)=>navData.isActive ? "sideBar__item  sideBar-active" : "sideBar__item"}>
        <TbCategory className="sideBar__item__icon" />
        <span className="sideBar__item__title">مدیریت کالاها</span>
      </NavLink>

      <NavLink to="/managementPanle/stock"  className={(navData)=>navData.isActive ? "sideBar__item  sideBar-active" : "sideBar__item"}>
        <MdOutlineInventory className="sideBar__item__icon" />
        <span className="sideBar__item__title"> مدیریت انبار</span>
      </NavLink>

      <NavLink to="/users"  className={(navData)=>navData.isActive ? "sideBar__item  sideBar-active" : "sideBar__item"}>
        <FaRegUser className="sideBar__item__icon" />
        <span className="sideBar__item__title">مدیریت کاربران</span>
      </NavLink>

      <NavLink to="" className="sideBar__item">
        <TfiComments className="sideBar__item__icon" />
        <span className="sideBar__item__title"> مدیریت دیدگاه ها</span>
      </NavLink>

      <NavLink to="" className="sideBar__item">
        <TbReportSearch className="sideBar__item__icon" />
        <span className="sideBar__item__title">گزارشات</span>
      </NavLink>

      <NavLink to="" className="sideBar__item">
        <TbBookmarks className="sideBar__item__icon" />
        <span className="sideBar__item__title">راهنما</span>
      </NavLink>

      <div className="sideBar__line-h"></div>

      <NavLink to="" className="sideBar__item">
        <SlSettings className="sideBar__item__icon" />
        <span className="sideBar__item__title">تنظیمات</span>
      </NavLink>

      <NavLink to="" className="sideBar__item">
        <BiSupport className="sideBar__item__icon" />
        <span className="sideBar__item__title">پشتیبانی</span>
      </NavLink>

      <NavLink to="" className="sideBar__item">
        <MdAccountCircle className="sideBar__item__icon" />
        <span className="sideBar__item__title">حساب کاربری</span>
      </NavLink>

      <div className="sideBar__line-h"></div>

      <NavLink to="/" className="sideBar__logo">
        <span className="sideBar__logo__title-one">MARVEL</span>
        <span className="sideBar__logo__title-sec">Digist</span>
      </NavLink>

      {/* <div className="flex j-c ">
        <NavLink to="" className="sideBar__StoreNavLink">
          <IoStorefrontSharp style={{ fontSize: "2.5rem" }} />
          <span style={{ fontSize: "1.5rem" }}>فروشگاه</span>
        </NavLink>
      </div> */}
    </div>
  );
};
