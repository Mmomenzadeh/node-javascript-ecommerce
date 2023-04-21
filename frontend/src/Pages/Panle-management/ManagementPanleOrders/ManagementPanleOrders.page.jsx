import { Button, Input, Table } from "Components";
import { OrderModal } from "Components/Modal";
import { BASE_URL } from "Config";
import { useEffect, useState } from "react";
import { BsPlusSquare } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilterData } from "Redux/Slices/ProductSlice";
import "../../../Assets/Styles/Pages/ManagementPanle/index.scss";
import { fetchFilterOrders } from "../../../Redux/Slices/OrdersSlice";
import { SearchDataHandler } from "Utils";

export const ManagementPanleOrders = () => {
  const [filterParams, setFilterParams] = useState(false);
  const [showOrderModal, setshowOrderModal] = useState({
    status: false,
    ORDERDATA: {},
  });
  const { ordersData } = useSelector((state) => state.orders);

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetchOrders());
    dispatch(
      fetchFilterOrders(
        `orders?_sort=createdAt&_order=desc&ststusPayment=true&delivered=${filterParams}`
      )
    );
  }, [dispatch, filterParams ]);

  const actionHandle = (data) => {
    setshowOrderModal({ status: true, ORDERDATA: data });
  };

  // --------------------------------------------------------------------------------------------------------

  //// بجایی ایتم جوابی که از سمت سرور گرفتیم میزاریم
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + 8;
  const currentItems = ordersData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(ordersData.length / 8);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 8) % ordersData.length;
    setItemOffset(newOffset);
  };

  // ----------------------------search--------------------------------------

  const SearchHandler = (queryString) => {
    console.log(queryString);
    let timeOut;

    clearTimeout(timeOut);
    if (queryString) {
      timeOut = setTimeout(() => {
        dispatch(
          fetchFilterOrders(
            `orders?username_like=${queryString}&ststusPayment=true&delivered=${filterParams}`
          )
        );
      }, 500);
    }
  };

  return (
    <>
      <div className="managementPanle">
        <div className="flex col">
          <div className="managementPanle__table-header">
            <div className="flex gap-1 a-c">
              <label className="managementPanle__table-header__label">
                جستجو :{" "}
              </label>
              <Input
                type="search"
                holder={`${ordersData.length} رکورد ....`}
                inpType="searchBoxAdmin"
                onChange={(e) =>
                  SearchHandler(e.target.value)
                }
              />
            </div>

            <div className="flex gap-1 a-c">
              <label
                className="managementPanle__table-header__label"
                htmlFor="delivered"
              >
                سفارش های تحویل شده{" "}
              </label>
              <Input
                type="radio"
                name="delivered"
                id="delivered"
                onChange={() => setFilterParams(true)}
              />
              <label
                className="managementPanle__table-header__label"
                htmlFor="notDelivered"
              >
                سفارش های در انتظار تحویل
              </label>
              <Input
                type="radio"
                name="delivered"
                id="notDelivered"
                onChange={() => setFilterParams(false)}
                checked={filterParams ? false : true}
              />
            </div>
          </div>
        </div>
        <Table className="adminTabel">
          <thead className="adminTabel__thead">
            <tr className="adminTabel__thead__tr">
              <th className="adminTabel__thead__tr__td"> نام کاربر</th>
              <th className="adminTabel__thead__tr__td"> مجموع مبلغ </th>
              <th className="adminTabel__thead__tr__td">زمان ثبت سفارش </th>
              <th className="adminTabel__thead__tr__td">اقدامات</th>
            </tr>
          </thead>
          <tbody className="adminTabel__tbody">
            {currentItems.map((data) => {
              let total = 0;
              data.products.map((item) => {
                return (total = item.price * item.count);
              });

              let date = new Date(data.createdAt);
              date = date.toLocaleString("fa");
              date = date.split(",").join("");
              return (
                <tr key={data.id} className="adminTabel__tbody__tr">
                  <td
                    style={{ width: "45rem" }}
                    className="adminTabel__tbody__tr__td "
                  >
                    {data.username + " " + data.lastname}
                  </td>

                  <td
                    className="adminTabel__tbody__tr__td"
                    style={{ width: "35rem", paddingRight: "3rem" }}
                  >
                    {data.prices.toLocaleString()} تومان
                  </td>
                  <td
                    className="adminTabel__tbody__tr__td"
                    style={{ width: "35rem", paddingRight: "5rem" }}
                  >
                    {date.substring(0, 10)}
                  </td>
                  <td
                    className="adminTabel__tbody__tr__td"
                    style={{ width: "15rem" }}
                  >
                    <Button
                      type="table-btn"
                      outline="outline-blue"
                      onClick={() => actionHandle(data)}
                    >
                      بررسی
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <ReactPaginate
          breakLabel="..."
          nextLabel="< next "
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel=" previous >"
          renderOnZeroPageCount={null}
          className="pagination activePage-w flex gap-5 j-c a-c  "
          activeClassName="activePage  "
        />

        {showOrderModal.status ? (
          <OrderModal
            setshowOrderModal={setshowOrderModal}
            showOrderModal={showOrderModal}
          />
        ) : null}
      </div>
    </>
  );
};
