import React from "react";
import { MdDoneAll, MdOutlineDone } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "../../../Assets/Styles/Pages/Payment/index.scss";
export const PaymentSuccess = () => {

  const navigation = useNavigate();

  setTimeout(() => {
    window.location.href = "http://localhost:3000/"
    // navigation("/");
    // navigation(0);
  }, 3000);


  return (
    <div className="PaymentSuccess">
      <div className="PaymentSuccess__circle">
        {/* <MdOutlineDone className="PaymentSuccess__checkmark" /> */}
        <span className="PaymentSuccess__checkmark">✓</span>
      </div>

      <div className=" flex col gap-2 a-c mt-5">
        <p className="fs-3" style={{ color: "#9abc66" }}>
          پرداخت با موفقیت انجام شد{" "}
        </p>
        <p className="fs-12 gray-300">
          {" "}
          تا لحظاتی دیگر به صحفه ی اصلی باز می گردید ...
        </p>
      </div>
    </div>
  );
};
