import { Loading } from "Components";
import { BLOG } from "Config";
import { ABOUT } from "Config";
import { BASKETSHOPPING } from "Config";
import { PANLEMANAGEMENT } from "Config";
import { ORDERS } from "Config";
import { LOGIN } from "Config";
import { CHECKOUT } from "Config";
import { CATEGORIES } from "Config";
import { USERACCOUNT } from "Config";
import { CONTACTUS } from "Config";
import { NOTFOUND } from "Config";
import { PAYMENT } from "Config";
import { SINGLEPRODUCT } from "Config";
import { ALLPRODUCTS } from "Config";
import { HOME } from "Config";
import { AdminMain } from "Layouts";
import {
  About,
  AllProducts,
  BasketShopping,
  Blog,
  Categories,
  Checkout,
  ContactUs,
  LogIn,
  NotFound,
  Orders,
  Payment,
  PaymentFaild,
  PaymentSuccess,
  SingleProduct,
  UserAccount,
} from "Pages";
import {
  ManagementPanleOrders,
  ManagementPanleProducts,
  ManagementPanleStock,
} from "Pages/Panle-management";
import { useEffect } from "react";
import { Suspense, lazy } from "react";

import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
const Home = lazy(() => import("../Pages"));

 const ProjectRoutes = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/login" && localStorage.getItem("access_token")) {
      navigate("/managementPanle");
    }
  }, [pathname]);

  return (
    <Routes>
      {/* private Route */}

      {localStorage.getItem("access_token") ||
      localStorage.getItem("refresh_token") ? (
        <>
          <Route path="/managementPanle" element={<AdminMain />}>
            <Route index element={<ManagementPanleOrders />} />
            <Route path="products" element={<ManagementPanleProducts />} />
            <Route path="stock" element={<ManagementPanleStock />} />
          </Route>
        </>
      ) : null}

      {/* Public Route */}
      <Route path="/basketShopping" element={<BasketShopping />} />
      <Route path={`/checkout`} element={<Checkout />} />
      <Route path={`/payment-result`} element={<Payment />} />
      <Route
        path="/payment-result/:paymentCode/payment-success"
        element={<PaymentSuccess />}
      />
      <Route
        path="/payment-result/:paymentCode/payment-failed"
        element={<PaymentFaild />}
      />
      <Route path={USERACCOUNT} element={<UserAccount />} />

      <Route
        path={HOME}
        element={
          <Suspense fallback={<Loading type="ripple" />}>
            <Home />
          </Suspense>
        }
      />
      <Route path={BLOG} element={<Blog />} />
      <Route path={ABOUT} element={<About />} />
      <Route path={ALLPRODUCTS} element={<AllProducts />} />
      <Route path="/products/:id" element={<SingleProduct />} />
      <Route path={ORDERS} element={<Orders />} />
      <Route path={`*`} element={<NotFound />} />
      <Route path={LOGIN} element={<LogIn />} />
      <Route path={CONTACTUS} element={<ContactUs />} />
      <Route path="/category/:id" element={<Categories />} />
    </Routes>
  );
};

export default ProjectRoutes