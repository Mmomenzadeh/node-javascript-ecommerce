import { GetSingleProduct } from "API";
import { AddQuantityBox, Button, HeadingTitle, Input } from "Components";
import { Footer, Header } from "Layouts";
import { useEffect, useState } from "react";
import {
  AiFillExclamationCircle,
  AiFillStar,
  AiOutlineHeart,
  AiOutlineRocket,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { BsStars } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { HiMinusSm, HiOutlineShare, HiPlusSm } from "react-icons/hi";
import { MdCompare, MdOutlineInventory } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbBellRinging, TbTruck } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { fetchProductCategory } from "Redux/Slices/ProductCategorySlice";
import { fetchProduct } from "Redux/Slices/SingleProductSlice";
import "../../Assets/Styles/Pages/singleProduct/index.scss";
import {
  AddToBasket,
  DecreaseQTY,
  DeleteBasketItem,
  IncermentQTY,
} from "Utils";

export const SingleProduct = () => {
  const [active, setActive] = useState({
    introduction: true,
    expertCheck: false,
    property: false,
    comments: false,
  });
  const { id } = useParams();

  const { productDetails } = useSelector((state) => state.singleProduct);
  const { categoryData } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct(id));
    dispatch(fetchProductCategory());
    document.body.style.overflow = "unset";

  }, [dispatch]);

  let brandLogo = {};
  for (const item of categoryData) {
    if (item.id === productDetails.category) {
      brandLogo = item.brands.find(
        (brand) => brand.name_en === productDetails.brand
      );
    }
  }
  ////----------------------Product Quantity and add to cart--------------------------------------------
  const [addQuantity, setAddQuantity] = useState(false);

  const { cartItems } = useSelector((state) => state.cartShopping);

  const selectedProduct = cartItems.find((p) => p.id === productDetails.id);

  return (
    <div className="singleProduct">
      <Header />
      <div className="singleProduct__body">
        <div className="singleProduct__body__swiperContainer"></div>
        {/* img basket details part */}
        <div className="flex">
          <div className="singleProduct__body__img">
            <div className="flex">
              <div className="singleProduct__body__img__imgToolbar">
                <AiOutlineHeart className="singleProduct__body__img__imgToolbar__icon" />
                <HiOutlineShare className="singleProduct__body__img__imgToolbar__icon" />
                <TbBellRinging className="singleProduct__body__img__imgToolbar__icon" />
                <MdCompare className="singleProduct__body__img__imgToolbar__icon" />
                <AiOutlineUnorderedList className="singleProduct__body__img__imgToolbar__icon" />
              </div>
              <img
                className="singleProduct__body__img__imgSize"
                src={`http://localhost:3002/files/${productDetails?.img?.[0]}`}
                alt={productDetails.name}
              />
            </div>
            <div className="singleProduct__body__img__imgSlider"></div>
          </div>
          <div className="singleProduct__body__product-content">
            <div className="singleProduct__body__product-content__details">
              <div className="singleProduct__body__product-content__details__title">
                {productDetails.name}
              </div>
              {/* details and basket */}
              <div className="flex">
                {/* details */}
                <div className="">
                  <div className="singleProduct__body__product-content__details__EnName ">
                    {productDetails.EnName}
                    <div className="line-en"></div>
                  </div>
                  {/* comments and star */}
                  <div className="flex a-c gap-1 a-c mt-1">
                    <div className=" flex a-c ">
                      <AiFillStar size={"1.2rem"} color={"gold"} />
                      <span style={{ fontSize: "1rem" }}>
                        {productDetails.star}
                      </span>
                      <span className="fs-1 gray-200">{`(${productDetails.vote})`}</span>
                    </div>
                    <div style={{ fontSize: "1rem", color: "var(--blue-100)" }}>
                      {productDetails.comments} دیدگاه
                    </div>
                    <div style={{ fontSize: "1rem", color: "var(--blue-100)" }}>
                      100 پرسش
                    </div>
                  </div>

                  <div className="flex col gap-1 mt-2">
                    <span style={{ fontSize: "1.5rem" }}>رنگ : {productDetails?.colors?.[0] && productDetails?.colors?.[0]}</span>
                    <div className="flex gap-1 mb-1 mt-1">
                      {productDetails?.colors?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="colors-item"
                            style={{ backgroundColor: `${item}` }}
                          ></div>
                        );
                      })}
                    </div>
                  </div>

                  <ul className="flex col gap-1 mt-1">
                    <span
                      className="mb-1"
                      style={{ fontSize: "1.3rem", fontWeight: "bold" }}
                    >
                      ویژگی ها
                    </span>
                    <li style={{ fontSize: "1.2rem" }}>
                      {" "}
                      <span className="gray-200">صحفه نمایش :</span>{" "}
                      {productDetails.display}
                    </li>
                    <li style={{ fontSize: "1.2rem" }}>
                      {" "}
                      <span className="gray-200">اندازه :</span>{" "}
                      {productDetails.size}
                    </li>
                    <li style={{ fontSize: "1.2rem" }}>
                      {" "}
                      <span className="gray-200">رزولوشن عکس :</span>{" "}
                      {productDetails.resolution} مگاپیکسل
                    </li>
                    <li style={{ fontSize: "1.2rem" }}>
                      {" "}
                      <span className="gray-200">نسخه سیستم عامل :</span>{" "}
                      {productDetails.os}
                    </li>
                  </ul>
                  <div className="line mt-2 mb-2"></div>
                  <div className="flex a-c gap-1 gray-200">
                    <AiFillExclamationCircle size="1.5rem" />
                    <span className="fs-11">
                      امکان برگشت کالا با دلیل{" "}
                      <span style={{ color: "var(--primary)" }}>
                        "انصراف از خرید"
                      </span>{" "}
                      تنها در صورتی مورد قبول است که پلمب کالا باز نشده باشد.
                    </span>
                  </div>
                  <div className="singleProduct__body__product-content__details__box">
                    <div className="flex a-c gap-1">
                      <BsStars size="2rem" color="#a6358a" />
                      <span className="fs-12">ویژه اعضایی مارول دیجست</span>
                    </div>

                    <div className="flex a-c gap-1 mr-05 ">
                      <GoPrimitiveDot size="1rem" color="#a6358a" />
                      <span className="fs-1 gray-200">
                        ارسال رایگان سفارش‌ها برای اعضای مارول دیجست
                      </span>
                    </div>

                    <div className="flex a-c gap-1 mr-05 ">
                      <GoPrimitiveDot size="1rem" color="#a6358a" />
                      <span className="fs-1 gray-200">
                        ارسال فوری برای شهر شیراز (رایگان)
                      </span>
                    </div>
                  </div>
                </div>

                {/* baseket */}

                <div className="singleProduct__body__product-content__details__addToBasket">
                  {/* header add to basket */}
                  <div className="flex a-c gap-1">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 17 17"
                        fill="none"
                      >
                        <path
                          d="M11.4679 1.41675H5.53204C2.95371 1.41675 1.41663 2.95383 1.41663 5.53217V11.4609C1.41663 14.0463 2.95371 15.5834 5.53204 15.5834H11.4608C14.0391 15.5834 15.5762 14.0463 15.5762 11.468V5.53217C15.5833 2.95383 14.0462 1.41675 11.4679 1.41675ZM12.2258 7.05508L10.5895 9.16592C10.3841 9.428 10.0937 9.598 9.76079 9.63342C9.42788 9.67592 9.10204 9.58383 8.83996 9.37842L7.54371 8.35842C7.49413 8.31592 7.43746 8.31592 7.40913 8.323C7.38079 8.323 7.33121 8.33717 7.28871 8.39383L5.60288 10.5826C5.49663 10.7172 5.34079 10.788 5.18496 10.788C5.07163 10.788 4.95829 10.7526 4.85913 10.6747C4.62538 10.4976 4.58288 10.1647 4.75996 9.93092L6.44579 7.74217C6.65121 7.48008 6.94163 7.31008 7.27454 7.26758C7.60038 7.22508 7.93329 7.31716 8.19538 7.52258L9.49163 8.54258C9.54121 8.58508 9.59079 8.58508 9.62621 8.578C9.65454 8.578 9.70413 8.56383 9.74663 8.50717L11.3829 6.39633C11.56 6.16258 11.9 6.12008 12.1266 6.30425C12.3604 6.4955 12.4029 6.82841 12.2258 7.05508Z"
                          fill="#EF3A4F"
                        ></path>
                      </svg>
                    </span>
                    <span
                      style={{
                        fontSize: "1.8rem",
                        fontWeight: "bold",
                        color: "var(--primary)",
                      }}
                    >
                      قیمت منصفانه
                    </span>
                  </div>
                  <div className="line mt-2 mb-2"></div>
                  <div className="flex a-c gap-1 ">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 40 40"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M14.9999 2.91699L13.7499 7.50033H10.4166V12.0837L8.33325 14.5837L10.4166 17.0837V21.2503L13.7499 22.5003V25.8337L17.4999 24.5837L20.8333 27.0837L23.3332 24.5837L26.6666 25.8337L28.7499 21.2503H31.6666V17.0837L33.3332 14.5837L30.4166 12.0837L31.6666 7.50033H28.7499L26.6666 2.91699L23.3332 5.00033L20.8333 1.66699L17.4999 5.00033L14.9999 2.91699ZM19.9999 20.0003C17.2429 20.0003 14.9999 17.7573 14.9999 15.0003C14.9998 12.2433 17.2428 10.0003 19.9999 10.0003C22.757 10.0003 24.9999 12.2434 24.9999 15.0003C24.9999 17.7573 22.757 20.0003 19.9999 20.0003Z"
                          fill="var(--primary)"
                        ></path>
                        <path
                          d="M20.1451 7.53711C16.2183 7.53711 13.0237 10.7318 13.0237 14.6586C13.0237 18.5854 16.2183 21.78 20.1451 21.78C24.0719 21.78 27.2666 18.5854 27.2666 14.6586C27.2666 10.7318 24.0719 7.53711 20.1451 7.53711ZM20.1451 19.2117C17.6345 19.2117 15.592 17.1691 15.592 14.6586C15.5919 12.148 17.6344 10.1055 20.1451 10.1055C22.6558 10.1055 24.6982 12.148 24.6982 14.6586C24.6982 17.1691 22.6558 19.2117 20.1451 19.2117Z"
                          fill="#202124"
                        ></path>
                        <path
                          d="M31.9279 22.2561L32.8204 22.0194L31.6975 17.7851L34.803 14.6954L31.7133 11.59L32.8579 7.36147L28.6294 6.21686L27.5065 1.98257L23.2722 3.10554L20.1826 0L17.0771 3.08968L12.8486 1.94507L11.704 6.17358L7.46959 7.29655L8.59256 11.5308L5.4871 14.6205L8.57678 17.7261L7.43217 21.9546L8.11873 22.1404L3.08374 34.692L10.631 34.2902L16.6359 40L19.9999 31.6136L23.3639 40L29.3687 34.2902L36.916 34.692L31.9279 22.2561ZM15.6619 35.5296L11.5992 31.6666L6.96569 31.9133L10.6148 22.816L11.6606 23.0991L12.7836 27.3333L17.0179 26.2104L18.7156 27.9168L15.6619 35.5296ZM17.7927 23.3478L14.6076 24.1925L13.7629 21.0074L10.5822 20.1464L11.4432 16.9657L9.11912 14.6297L11.4551 12.3056L10.6104 9.12053L13.7955 8.27584L14.6566 5.09515L17.8373 5.95616L20.1733 3.6321L22.4973 5.96811L25.6825 5.12343L26.5272 8.3085L29.7079 9.16951L28.8468 12.3502L31.1709 14.6862L28.835 17.0103L29.6797 20.1954L26.4946 21.04L25.6336 24.2207L22.4529 23.3597L20.1168 25.6837L17.7927 23.3478ZM28.4007 31.6666L24.3381 35.5296L21.3499 28.0799L23.213 26.2263L27.4415 27.3709L28.5861 23.1424L29.4267 22.9194L33.0343 31.9131L28.4007 31.6666Z"
                          fill="#202124"
                        ></path>
                      </svg>
                    </span>
                    <span className="fs-14 ">{productDetails.guarantee}</span>
                  </div>

                  <div className="line mt-2 mb-2"></div>

                  <div className="flex a-c gap">
                    <MdOutlineInventory size="2.2rem" color="var(--primary)" />
                    <span className="fs-11">موجودی در انبار مارول دیجیست</span>
                  </div>
                  <div className="mt-2 mb-2 flex j-c">
                    <span
                      style={{ fontSize: "1.2rem", color: "var(--gray-300)" }}
                    >
                      {productDetails.quantity} عدد موجوی
                    </span>
                  </div>
                  <div className="flex col gap-1 mt-1 ">
                    <div className="flex a-c gap ">
                      <TbTruck
                        size="2rem"
                        color="var(--blue-100)"
                        className="rotate"
                      />
                      <span className="fs-1">ارسال مارول دیجیست</span>
                    </div>

                    <div className="flex a-c gap">
                      <AiOutlineRocket size="2rem" color="var(--blue-100)" />
                      <span className="fs-1">ارسال فوری (شهر شیراز )</span>
                    </div>

                    <div className="line mt-2 mb-2"></div>
                    <div className="flex j-sb a-c">
                      <span
                        className="fs-08"
                        style={{ color: "var(--gray-300)" }}
                      >
                        قیمت مارول دیجست{" "}
                      </span>
                      <div className="flex gap">
                        <span className="fs-15 bolder">
                          {" "}
                          {productDetails?.price?.toLocaleString()}
                        </span>
                        <span
                          className="fs-09"
                          style={{ color: "var(--primary)" }}
                        >
                          تومان
                        </span>
                      </div>
                    </div>
                    {addQuantity || selectedProduct?.QTY === 1 ? (
                      <div className="flex gap-1 a-c">
                        <div className="flex gap a-c addQuantityBox ">
                          <HiPlusSm
                            size="2rem"
                            className="pointer"
                            onClick={() =>
                              IncermentQTY(productDetails, dispatch)
                            }
                          />

                          <p className="addQuantity">{selectedProduct?.QTY}</p>

                          {selectedProduct?.QTY === 1 ? (
                            <RiDeleteBin6Line
                              size="1.8rem"
                              className="pointer"
                              color="var(--primary)"
                              onClick={() => {
                                DeleteBasketItem(productDetails.id, dispatch);
                                setAddQuantity(false);
                              }}
                            />
                          ) : (
                            <HiMinusSm
                              size="2rem"
                              className="pointer"
                              onClick={() =>
                                DecreaseQTY(productDetails, dispatch)
                              }
                            />
                          )}
                        </div>

                        <div className="flex col gap-1">
                          <span className="fs-08">در سبد شما </span>
                          <div className="fs-08 flex gap ">
                            <span>مشاهده</span>
                            <Link
                              to={`/basketShopping`}
                              className="blue-100 link"
                            >
                              سبد خرید{" "}
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Button
                        className="basketBtn"
                        onClick={() => {
                          AddToBasket(productDetails, dispatch);
                          setAddQuantity(true);
                        }}
                      >
                        افزودن به سبد خرید
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className=""></div>
            </div>
            <div className="singleProduct__body__product-content__"></div>
          </div>
        </div>
        {/* description part */}
        <div className="singleProduct__body__description">
          <div className="flex gap-2 mt-5 fs-11 gray-400 pointer">
            <span
              onClick={() => setActive({ introduction: true })}
              className={active.introduction ? "active" : "nonActive"}
            >
              معرفی
            </span>
            <span
              onClick={() => setActive({ expertCheck: true })}
              className={active.expertCheck ? "active" : "nonActive"}
            >
              بررسی تخصصی
            </span>
            <span
              onClick={() => setActive({ property: true })}
              className={active.property ? "active" : "nonActive"}
            >
              مشخصات
            </span>
            <span
              onClick={() => setActive({ comments: true })}
              className={active.comments ? "active" : "nonActive"}
            >
              دیدگاه ها{" "}
            </span>
          </div>
          <div className="line mt-2 mb-2"></div>

          <div
            className="singleProduct__body__description__txt"
            dangerouslySetInnerHTML={{
              __html: active.introduction ? productDetails.description : null,
            }}
          ></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
