import { AiOutlineHome } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegNewspaper } from "react-icons/fa";
import {ImNewspaper} from "react-icons/im"
import { SlBasket } from "react-icons/sl";
import { IoPersonOutline } from "react-icons/io5";
import "../../Assets/Styles/Components/Toolbar/index.scss";
import { Link } from "react-router-dom";
import { HOME } from "Config";
import { BLOG } from "Config";
import { BASKETSHOPPING } from "Config";
import { USERACCOUNT } from "Config";
import { CATEGORIES } from "Config";
import { LOGIN } from "Config";
export const Toolbar = () => {
  return (
    <div className="toolbar">

      <Link to={HOME} className="toolbar__item ">
        <AiOutlineHome className="toolbar__item__icon" />
        <span className="toolbar__item__title">خانه</span>
      </Link>

      <Link to={CATEGORIES} className="toolbar__item">
        <BiCategoryAlt className="toolbar__item__icon" />
        <span className="toolbar__item__title">دسته بندی ها</span>
      </Link>

      <Link to={BLOG} className="toolbar__item">
        <FaRegNewspaper className="toolbar__item__icon" />
        <span className="toolbar__item__title">وبلاگ</span>
      </Link>

      <Link to={BASKETSHOPPING} className="toolbar__item">
        <SlBasket className="toolbar__item__icon" />
        <span className="toolbar__item__title">سبد خرید</span>
      </Link>

      <Link to={LOGIN} className="toolbar__item">
        <IoPersonOutline className="toolbar__item__icon" />
        <span className="toolbar__item__title"> مدیریت </span>
      </Link>
    </div>
  );
};
