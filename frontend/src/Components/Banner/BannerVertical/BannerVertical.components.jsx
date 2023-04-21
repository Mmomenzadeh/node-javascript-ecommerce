import { Button } from "Components";
import { HiOutlineShoppingCart } from "react-icons/hi";
import "../../../Assets/Styles/Components/Banner/index.scss";

export const BannerVertical = ({ img, name, heading, btnTxt }) => {
  return (
    <div className="BannerVertical">
      <img className="BannerVertical__img" src={img} alt={name} />
      <span className="BannerVertical__name">{name}</span>
      <p className="BannerVertical__heading">{heading}</p>
      <div className="BannerVertical__btn">
        <Button size="medium" outline="outline-banner">
          <HiOutlineShoppingCart size="1.8rem" />
          {btnTxt}
        </Button>
      </div>
    </div>
  );
};
