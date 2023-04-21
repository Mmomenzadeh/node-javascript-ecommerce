import { Logo, SearchBox, SearchBoxLarge, Snackbar } from "Components";
import { Nav } from "Components/Nav/Nav.components";
import { BsHeart } from "react-icons/bs";
import { IoBagOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "../../../Assets/Styles/Layout/HeaderUser/index.scss";
import { useState } from "react";

export const Header = () => {
  const [showSearchBox, setShowSearchBox] = useState(false);

  const { cartItems } = useSelector((state) => state.cartShopping);
  return (
    <>
      {showSearchBox ? (
        <div
          className="Background"
          onClick={() => {
            document.body.style.overflowY = "unset";
            setShowSearchBox(false);
          }}
        ></div>
      ) : null}

      <header>
        <div className="header-right">
          <Logo />
          <SearchBoxLarge
            showSearchBox={showSearchBox}
            setShowSearchBox={setShowSearchBox}
          />

        </div>
        <div className="header-left">
          <Link className="header-left__icon">
            <VscAccount size="3rem" />
          </Link>

          <Link to="/login" className="header-left__Link">
            ورود / ثبت نام
          </Link>
          <div className="line-h"></div>
          <BsHeart size="2.5rem" className="header-left__icon" />
          <div className="line-h"></div>
          <Link className="header-left__icon " to="/basketShopping">
            <IoBagOutline size="2.8rem" />
            {cartItems && cartItems.length === 0 ? null : (
              <span className="badge-header">{cartItems.length}</span>
            )}
          </Link>
        </div>
      </header>
      <div className="mt-10">
        <Nav />
      </div>
    </>
  );
};
