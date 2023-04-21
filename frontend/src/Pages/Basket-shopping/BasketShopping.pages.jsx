import {
  AddQuantityBox,
  Button,
  Input,
  ProductsList,
  ScrollbarSlider,
} from "Components";
import { Footer, Header } from "Layouts";
import { useEffect, useState } from "react";
import { AiOutlineSafety } from "react-icons/ai";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SlBasket } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DECREASE, DELETE, INCERMENT } from "Redux/Slices/CartShoppingSlice";
import { fetchProducts } from "Redux/Slices/ProductSlice";
import "../../Assets/Styles/Pages/BasketShopping/index.scss";
import { DecreaseQTY, DeleteBasketItem, IncermentQTY } from "Utils";

export const BasketShopping = () => {
  const { cartItems ,totalPrice } = useSelector((state) => state.cartShopping);
  const dispatch = useDispatch();
  let selectedProduct = {};



  const { productData } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts("_limit=5"));
  }, [dispatch]);

  /////-----------------------------------------------------------------
  const [active, setActive] = useState({
    shoppingBasket: true,
    incompleteOrders: false,
  });

  return (
    <div>
      <Header />
      <div style={{ padding: "0 20rem" }}>
        <div className="mt-5">
          <div className="flex gap-2 a-c pointer fs-1 mb-1">
            <div
              onClick={() => setActive({ shoppingBasket: true })}
              className={
                active.shoppingBasket
                  ? "flex gap a-c active"
                  : "flex gap a-c nonActive"
              }
            >
              <span>سبد خرید</span>
              {cartItems && cartItems.length === 0 ? null : (
                <span className="badge">{cartItems.length}</span>
              )}
            </div>

            <span
              onClick={() => setActive({ incompleteOrders: true })}
              className={active.incompleteOrders ? "active" : "nonActive"}
            >
              سفارشات ناموفق
            </span>
          </div>

          <div className="line "></div>
        </div>

        <div className="BasketShopping flex gap-1 j-c mt-5">
          {cartItems.length === 0 ? (
            <div className="flex col a-c gap-5">
              <SlBasket size="10rem" color="var(--gray-200)" />

              <div className="flex col a-c gap-1">
                <p className="fs-14 gray-400"> سبد خرید شما خالی است !</p>
                <span className="fs-1 gray-200">
                  می‌توانید برای مشاهده محصولات بیشتر به صفحات زیر بروید:
                </span>
              </div>
            </div>
          ) : (
            <>
              <div className="BasketShopping__orderList">
                {cartItems &&
                  cartItems.map((p) => {
                    selectedProduct = cartItems.find(
                      (product) => product.id === p.id
                    );

                    return (
                      <div className="BasketShopping__orderList__item">
                        <div className="BasketShopping__orderList__item__img">
                          <img
                            src={`http://localhost:3002/files/${p.img}`}
                            alt={p.name}
                            style={{ width: "12rem", height: "12rem" }}
                          />
                        </div>
                        <div className="BasketShopping__orderList__item__content flex col gap-2 j-c">
                          <div className="fs-1" style={{ lineHeight: "1.3" }}>
                            {p.name.substring(0, 50)}
                          </div>
                          <div className="flex a-c gap fs-1 gray-200">
                            <AiOutlineSafety size="1.3rem" />{" "}
                            <span>گارانتی اصالت و سلامت فیزیکی کالا</span>
                          </div>
                          <div className="line"></div>
                          <div className="flex a-c j-sb">
                            <p className="fs-13">
                              <span>{p.price}</span>{" "}
                              <span style={{ color: "var(--primary)" }}>
                                تومان
                              </span>
                            </p>

                            <div className="flex gap-1 a-c">
                              <div className="flex gap a-c addQuantityBox ">
                                <HiPlusSm
                                  size="2rem"
                                  className="pointer"
                                  // onClick={() => IncermentHandle_Basket(p)}

                                  onClick={()=>IncermentQTY(p , dispatch)}
                                />

                                <p className="addQuantity">
                                  {selectedProduct?.QTY}
                                </p>

                                {selectedProduct?.QTY === 1 ? (
                                  <RiDeleteBin6Line
                                    size="1.8rem"
                                    className="pointer"
                                    color="var(--primary)"
                                    onClick={() => DeleteBasketItem(p.id , dispatch)}
                                  />
                                ) : (
                                  <HiMinusSm
                                    size="2rem"
                                    className="pointer"
                                    onClick={() => DecreaseQTY(p , dispatch)}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="BasketShopping__checkOutBox">
                <div className="flex j-sb">
                  <p className="fs-11 gray-300">قیمت کالا ها </p>
                  <p className="fs-11 gray-300 flex gap ">
                    {cartItems &&
                      cartItems
                        .reduce((total, product) => {
                          return total + +product.price * product.QTY;
                        }, 0)
                        .toLocaleString()}

                    <span style={{ color: "var(--primary)" }}>تومان</span>
                  </p>
                </div>

                <div className="flex j-sb">
                  <p className="fs-11 gray-300">جمع سبد خرید </p>
                  <p className="fs-11 gray-300 flex gap">
                    {cartItems &&
                      cartItems
                        .reduce((total, product) => {
                          return total + +product.price * product.QTY;
                        }, 0)
                        .toLocaleString()}
                    <span style={{ color: "var(--primary)" }}>تومان</span>
                  </p>
                </div>

                <Link className="orderBtn" to="/checkout">
                  ثبت سفارش
                </Link>
                <div className="flex j-sb ">
                  <p className="fs-11 gray-300">سبد خرید شما </p>
                  <p className="fs-12 gray-300 blue-100  ">
                    {cartItems.length} کالا
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        {/* <div className="line mt-5 mb-5"></div>
        <div className=" BasketShopping_slider">
          <ScrollbarSlider />

          <ProductsList productData={productData} />
        </div> */}
      </div>
      <Footer />
    </div>
  );
};
