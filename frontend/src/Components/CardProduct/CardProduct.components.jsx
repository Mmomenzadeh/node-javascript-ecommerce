import { Button } from "Components";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";
import "../../Assets/Styles/Components/CardProduct/index.scss";
import { useDispatch } from "react-redux";
import { AddToBasket } from "Utils";

export const CardProduct = ({ size, product }) => {
  const dispatch = useDispatch();
  // console.log(product.img[0]);

  return (
    <div className={`CardProduct${size} pointer`}>
      <Link to={`/products/${product.id}`} className="link">
        <div className={`CardProduct${size}__head`}>
          <img
            className={`CardProduct${size}__head__img`}
            src={`http://localhost:3002/files/${product.img[0]}`}
            alt={product.name}
          />
        </div>
        <div className={`CardProduct${size}__body`}>
          <span className={`CardProduct${size}__body__txt`}>
            {product.model}
          </span>
          <p className={`CardProduct${size}__body__heading `}>{product.name}</p>
          <div className="line"></div>
        </div>
      </Link>

      <div className={`CardProduct${size}__footer`}>
        <p className={`CardProduct${size}__footer__price`}>
          {" "}
          <span style={{ color: "#EF3A4F" }}>{product.price.toLocaleString()}</span> تومان
        </p>

        <div className={`CardProduct${size}__footer__btn`}>
          <Button
            size="small"
            type="productCard"
            onClick={() => AddToBasket(product, dispatch)}
          >
            <HiOutlineShoppingCart size="1.5rem" color="white" />
            خرید محصول
          </Button>
        </div>
      </div>
    </div>
  );
};
