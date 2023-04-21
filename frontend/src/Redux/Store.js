import { configureStore } from "@reduxjs/toolkit";
import CartShoppingSlice from "./Slices/CartShoppingSlice";
import OrdersSlice from "./Slices/OrdersSlice";
import ProductCategorySlice from "./Slices/ProductCategorySlice";
import ProductSlice from "./Slices/ProductSlice";
import SingleProductSlice from "./Slices/SingleProductSlice";
import SubCategorySlice from "./Slices/SubCategorySlice";
import SearchProductSlice from "./Slices/SearchProductSlice";

export const Store = configureStore({
    reducer : {
        products : ProductSlice ,
        category : ProductCategorySlice ,
        orders : OrdersSlice,
        subCategory : SubCategorySlice,
        singleProduct : SingleProductSlice,
        cartShopping : CartShoppingSlice ,
        SreachData : SearchProductSlice,
    }
})