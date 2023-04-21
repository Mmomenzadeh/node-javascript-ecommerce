import { DeliveryNote } from "API";
import { Button, Table } from "Components";
import { useState } from "react";
import { CgCloseR } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchFilterOrders } from "Redux/Slices/OrdersSlice";
import "../../../Assets/Styles/Components/Modal/index.scss";

export const OrderModal = ({ showOrderModal, setshowOrderModal }) => {
  const { ORDERDATA } = showOrderModal;
  const [delivery, setDelivery] = useState(false);
  const dispatch = useDispatch()

  const deliveryBtn = () => {
    DeliveryNote(ORDERDATA)
      .then(() => {
        toast.success("با مو فقیت ثبت شد")
        setDelivery(true) 
      })
      .catch((err) => {
        toast.error("ثبت ناموفق ")
        console.log(err.message);
      }).finally(()=>{
          dispatch(fetchFilterOrders('/orders?delivered=false'))
      })
    // setshowOrderModal({ ...showOrderModal, status: false });
  };
  return (
    <div className="modal">
      <div className="background"></div>
      <div className="modalContainer">
        <div className="modalContainer__header">
          <p className="modalContainer__header__title">جزئیات سفارش</p>
          <CgCloseR
            onClick={() =>
              setshowOrderModal({ ...showOrderModal, status: false })
            }
            className="modalContainer__header__icon"
          />
        </div>
        <div className="line-h"></div>
        <div className="modalContainer__body">
          <div className="modalContainer__body__orderInfo">
            {/* name */}

            <div className="flex gap-1 a-c">
              <label className="modalContainer__body__orderInfo__lbl">
                {" "}
                تحویل گرینده :
              </label>
              <span>{ORDERDATA.username + " " + ORDERDATA.lastname }</span>
            </div>
            <div className="flex gap-1 a-c">
              <label className="modalContainer__body__orderInfo__lbl">
                {" "}
                شماره موبایل :
              </label>
              <span> {ORDERDATA.phone} </span>
            </div>
            {/* time */}

            <div className="flex gap-1 a-c">
              <label className="modalContainer__body__orderInfo__lbl">
                {" "}
                تاریخ ثبت سفارش :
              </label>
              <span> {new Date(ORDERDATA.createdAt).toLocaleDateString("fa")} </span>
            </div>
            <div className="flex gap-1 a-c">
              <label className="modalContainer__body__orderInfo__lbl">
                {" "}
                زمان تحویل :
              </label>
              <span> {new Date(ORDERDATA.expectAt).toLocaleDateString("fa")} </span>
            </div>

            <div className="flex gap-1 a-c">
              <label className="modalContainer__body__orderInfo__lbl">
                {" "}
                ادرس گرینده:
              </label>
              <span className="modalContainer__body__orderInfo__address">
                {
                  ORDERDATA.address
                }
              </span>
            </div>

            {/* table */}
            <div className="modalContainer__body__orderInfo__table">
              <Table className="modalTable">
                <thead className="modalTable__thead">
                  <tr className="modalTable__thead__tr">
                    <th className="modalTable__thead__tr__td">نام کالا</th>
                    <th className="modalTable__thead__tr__td"> قیمت </th>
                    <th className="modalTable__thead__tr__td">تعداد</th>
                  </tr>
                </thead>
                <tbody>
                  {ORDERDATA.products.map((data) => {
                       return (
                        <tr key={data.id} className="modalTable__tbody__tr">
                          <td
                            style={{ width: "15rem" }}
                            className="modalTable__tbody__tr__td "
                          >
                            <Link
                              to={``}
                              className="link line-h-2"
                              style={{ color: "#444" }}
                            >
                              {data.name.length > 50 ?`${ data.name.substring(0 , 50) }...`: data.name}
                            </Link>
                          </td>

                          <td
                            style={{ width: "2rem" }}
                            className="modalTable__tbody__tr__td"
                          >
                            {data.price.toLocaleString()}
                          </td>
                          <td
                            style={{ width: "2rem", paddingRight: "3rem" }}
                            className="modalTable__tbody__tr__td"
                          >
                            {data.QTY}
                          </td>
                        </tr>
                      );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
        <div className="modalContainer__footer">
          {delivery || ORDERDATA.delivered ? (
            <p className="delivery">
              {" "}
              <span style={{ color: "#EF3A4F" }}>
                زمان تحویل :{" "}
              </span> {new Date(ORDERDATA.expectAt).toLocaleDateString("fa")}
            </p>
          ) : (
            <Button type="modalBtn" size="full" onClick={deliveryBtn}>
              تحویل شد{" "}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
