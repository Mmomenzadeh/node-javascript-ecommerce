import { FaRegNewspaper } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoIosPeople } from "react-icons/io";
import "../../Assets/Styles/Components/Nav/index.scss";
import { Link } from "react-router-dom";
import { BiCategoryAlt } from "react-icons/bi";
import { useState } from "react";
import { MegaMenu } from "Components/MegaMenu/MegaMenu.components";

export const Nav = () => {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  return (
    <nav className="nav flex a-c j-sb">
      {/* --right-- */}

      <div className="flex gap-3 a-c">
        {/* --category icon-- */}
        <div
          className="flex a-c gap "
          onMouseEnter={() => {
            document.body.style.overflow ="hidden"
            setShowMegaMenu(true)
          }}
        >
          <BiCategoryAlt size="3.5rem" />
          <span className="fs-2">دسته بندی کالاها</span>
          {showMegaMenu ? <MegaMenu setShowMegaMenu={setShowMegaMenu} /> : null}
        </div>

        <Link to={`/`} className="link fs-13 gray-300 flex gap a-c">
          <IoHomeOutline size="2rem" />
          <span className="">صحفه ی اصلی</span>
        </Link>

        <Link className="link fs-13 gray-300 flex gap a-c">
          <HiOutlineShoppingCart size="2rem" />
          <span className="">فروشگاه</span>
        </Link>
        <Link className="link fs-13 gray-300 flex gap a-c">
          <FaRegNewspaper size="2rem" />
          <span className="">وبلاگ</span>
        </Link>
        <Link className="link fs-13 gray-300 flex gap a-c">
          <IoIosPeople size="2rem" />

          <span className="">درباره ی ما</span>
        </Link>
        <Link className="link fs-13 gray-300 flex gap a-c">
          <MdOutlinePhoneInTalk size="2rem" />
          <span className="">تماس با ما</span>
        </Link>
      </div>

      {/* ---left */}

      <div className="flex a-c gap-1 ">
        <div className="fs-1 back-round-2 gray-300">سوالی دارید ؟ تماس بگرید</div>
        <p className="fs-15 bold">
          <span className="primary">071</span >
          <span className="gray-400">-36322050</span>
        </p>
        <div className="back-round-50">
          <MdOutlinePhoneInTalk className="fs-18 gray-300" />
        </div>
      </div>
    </nav>
  );
};
