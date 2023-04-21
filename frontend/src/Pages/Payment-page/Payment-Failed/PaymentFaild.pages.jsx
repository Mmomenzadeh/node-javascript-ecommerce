import React from 'react'
import { useNavigate } from 'react-router-dom';
import {GrClose} from "react-icons/gr"
import { IoMdClose } from 'react-icons/io';
export const PaymentFaild = () => {
  const navigation = useNavigate();

  setTimeout(() => {
    navigation("/checkout");
    navigation(0);

  }, 3000);


  return (
    <div className="PaymentFaild">
      <div className="PaymentFaild__circle">
        <IoMdClose  className="PaymentFaild__failed "/>
      </div>

      <div className=" flex col gap-3 a-c mt-5">
        <p  style={{ color: "var(--primary)"  , fontSize:"4rem"}}>
          پرداخت ناموفق
        </p>
        <p className="fs-12 gray-300">
          {" "}
          تا لحظاتی دیگر به صحفه ی ثبت سفارش باز می گردید ...
        </p>
      </div>
    </div>
  );
}
