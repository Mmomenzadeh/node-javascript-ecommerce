import { EditeProductService, PostOrder } from "API";
import { Button } from "Components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../../Assets/Styles/Pages/Payment/index.scss";
import { useEffect } from "react";
import { fetchProducts } from "Redux/Slices/ProductSlice";

export const Payment = () => {
  const data = JSON.parse(localStorage.getItem("order"));
  const navigation = useNavigate();

  const dispatch = useDispatch();
  const { productData } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const paymentSuccessHandle = () => {
    for (const product of productData) {
      data.products.map((item) => {
        if (item.id === product.id) {
          EditeProductService({
            ...product,
            quantity: product.quantity - item.QTY,
          })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          return;
        }
      });
    }

    PostOrder({ ...data, ststusPayment: true })
      .then((res) => {
        console.log(res.data);
        navigation(`/payment-result/${res.data.id}/payment-success`);
        localStorage.setItem("cart-shopping", []);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const paymentFailedHandle = () => {
    PostOrder({ ...data, ststusPayment: false })
      .then((res) => {
        console.log(res.data);
        navigation(`/payment-result/${res.data.id}/payment-failed`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="Payment">
      <div className="Payment__form ">
        <img
          src="https://www.uplooder.net/img/image/99/ba6926cd693639cb29c0c076e5b45703/payment.png"
          alt="payment"
        />
        <div className="flex gap-2 mt-5">
          <Button className="PaymentBtn bg-g " onClick={paymentSuccessHandle}>
            پرداخت
          </Button>
          <Button className="PaymentBtn bg-w " onClick={paymentFailedHandle}>
            انصراف
          </Button>
        </div>
      </div>
    </div>
  );
};
