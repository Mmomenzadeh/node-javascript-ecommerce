import { Button, Input } from "Components";
import { SlBasket, SlWallet } from "react-icons/sl";
import { TbTruckDelivery } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../../Assets/Styles/Pages/Checkout/index.scss";
import { useForm, Controller } from "react-hook-form";
import { PostOrder } from "API";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import { useState } from "react";
import InputIcon from "react-multi-date-picker/components/input_icon";
import { FormatDate } from "Utils";

// import "./style.css"

export  const Checkout  = () => {
  const { cartItems, totalPrice } = useSelector((state) => state.cartShopping);
  // console.log(cartItems);

  const shippingCost = 100000;

  const totalPay = cartItems.reduce((total, product) => {
    return total + +product.price * product.QTY;
  }, 0);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  ///-------------------------------------------------------

  const [submittedDate, setSubmittedDate] = useState();
  const weekDays = [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه شنبه",
    "چهارشنبه",
    "پنچ شنبه",
    "جمعه",
  ];
  //////----------------------------------------------
  const navigation = useNavigate();
  const paymentCode = Math.floor(Math.random() * 1000000000);
  const onSubmit = (data) => {
    setSubmittedDate(new Date(data.date).getTime());

    localStorage.setItem(
      "order",
      JSON.stringify({
        ...data,
        products: cartItems,
        delivered: false,
        prices: totalPay + shippingCost,
        expectAt: FormatDate(data.date),
      })
    );
    window.location.href =`/payment-result`;
  };

  return (
    <div className="checkout">
      <div className="checkout__top ">
        <p className="fs-3 bolder primary ">Marvel Digist</p>
        <div className="flex a-c  gap-2 mt-5">
          <div className="fs-13 primary-T flex a-c gap ">
            <SlBasket size="2rem" />
            <span>سبد خرید</span>
          </div>

          <div className="line-small primary-T"></div>

          <div className="fs-13 primary flex a-c gap ">
            <TbTruckDelivery size="2.5rem" />
            <span className="fs-18"> زمان و مکان ارسال </span>
          </div>

          <div className="line-small gray-100"></div>

          <div className="fs-13 gray-150 flex a-c gap ">
            <SlWallet size="2rem" />
            <span> پرداخت</span>
          </div>
        </div>
      </div>
      <form className="flex gap-1 mt-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="checkout__main">
          <div className="flex a-c wrap gap-3">
            <div className="flex col gap">
              <label className="fs-1 gray-300 mr-1">نام :</label>
              <Input
                className="checkOut"
                type="text"
                validate={{
                  ...register("username", {
                    required: "وارد کردن  نام الزامی ست ",
                  }),
                }}
              />
              {errors.username && (
                <p className="error">{errors.username.message}</p>
              )}
            </div>
            <div className="flex col gap">
              <label className="fs-1 gray-300 mr-1"> نام خانوادگی : </label>
              <Input
                className="checkOut"
                type="text"
                validate={{
                  ...register("lastname", {
                    required: "وارد کردن  نام خانوداگی الزامی ست ",
                  }),
                }}
              />
              {errors.lastname && (
                <p className="error">{errors.lastname.message}</p>
              )}
            </div>
            <div className="flex col gap">
              <label className="fs-1 gray-300 mr-1">تلقن همراه :</label>
              <Input
                className="checkOut"
                type="number"
                validate={{
                  ...register("phone", {
                    required: "وارد کردن  شماره تلفن همراه الزامی ست ",
                  }),
                }}
              />
              {errors.phone && <p className="error">{errors.phone.message}</p>}
            </div>
            <div className="flex col gap">
              <label className="fs-1 gray-300 mr-1">تاریخ تحویل :</label>
              <Controller
                control={control}
                name="date"
                rules={{ required: true }} //optional
                render={({
                  field: { onChange, name, value },
                  fieldState: { invalid, isDirty }, //optional
                  formState: { errors }, //optional, but necessary if you want to show an error message
                }) => (
                  <>
                    <div style={{ direction: "rtl" }}>
                      <DatePicker
                        inputMode="none"
                        className="test-calendar"
                        containerClassName="test-container"
                        value={value || ""}
                        onChange={(date) => {
                          onChange(date?.isValid ? date : "");
                        }}
                        render={<InputIcon />}
                        weekDays={weekDays}
                        calendar={persian}
                        locale={persian_fa}
                        minDate={ new Date().setDate(new Date().getDate())}
                        // maxDate={ new Date().setDate(new Date().getDate()+10)}
                        calendarPosition="bottom-right"
                      />
                    </div>
                    {errors &&
                      errors[name] &&
                      errors[name].type === "required" && (
                        //if you want to show an error message
                        <span className="error">
                          انتخاب زمان ارسال الزامی ست{" "}
                        </span>
                      )}
                  </>
                )}
              />
            </div>
            <div className="flex col gap">
              <label className="fs-1 gray-300 mr-1">ادرس :</label>
              <textarea
                className="textarea"
                cols="99"
                rows="5"
                {...register("address", {
                  required: "وارد کردن ادرس الزامی ست ",
                })}
              ></textarea>
              {errors.address && (
                <p className="error">{errors.address.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="checkout__side">
          <div className="flex j-sb">
            <p className="fs-11 gray-300">قیمت کالا ها ({cartItems.length})</p>
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
            <p className="fs-11 gray-300">
              {" "}
              هزینه ی ارسال{" "}
              <span className="badge-blue"> {cartItems.length}مرسوله</span>{" "}
            </p>
            <p className="fs-11 gray-300 flex gap">
              {shippingCost.toLocaleString()}
              <span style={{ color: "var(--primary)" }}>تومان</span>
            </p>
          </div>

          <div className="flex j-sb">
            <p className="fs-11 gray-300"> مبلغ قابل پرداخت </p>
            <p className="fs-11 gray-300 flex gap ">
              {(totalPay + shippingCost).toLocaleString()}

              <span style={{ color: "var(--primary)" }}>تومان</span>
            </p>
          </div>

          <Button className="checkOutBtn">پرداخت</Button>
        </div>
      </form>
    </div>
  );
};

// <Button  onSubmit={handleSubmit(onSubmit)}>

// </Button>
