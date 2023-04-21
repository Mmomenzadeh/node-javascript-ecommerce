import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const upDateLocalSorage = (cart) => {
  localStorage.setItem("cart-shopping", JSON.stringify(cart));
};

const CartShoppingSlice = createSlice({
  name: "CartShopping/Slice",
  initialState: {
    cartItems: localStorage.getItem("cart-shopping")
      ? JSON.parse(localStorage.getItem("cart-shopping"))
      : [],
    totalPrice: 0,
  },

  reducers: {
    ADD: (state, action) => {
      const hasProduct = state.cartItems.find((p) => p.id === action.payload.id)
        ? true
        : false;

      state.cartItems = hasProduct
        ? state.cartItems.map((p) =>
            p.id === action.payload.id ? { ...p, QTY: p.QTY + 1 } : p
          )
        : [...state.cartItems, { ...action.payload, QTY: 1 }];
      ///total
      // debugger
      // console.log(hasProduct);
      // console.table(state)
      if (hasProduct) {
        state.totalPrice += hasProduct.price * hasProduct.QTY;
      }
      upDateLocalSorage(state.cartItems);
    },
    INCERMENT: (state, action) => {
      const selectedProduct = state.cartItems.find(
        (p) => p.id === action.payload.id
      );

      if (selectedProduct.QTY < action.payload.quantity) {
        state.cartItems = state.cartItems.map((p) =>
          p.id === action.payload.id ? { ...p, QTY: p.QTY + 1 } : p
        );

        upDateLocalSorage(state.cartItems);
      } else {
        toast.error("تعداد انتخاب شده بیشتر از حد مجاز است ");
      }
    },
    DECREASE: (state, action) => {
      const selectedProduct = state.cartItems.find(
        (p) => p.id === action.payload.id
      );

      if (selectedProduct.QTY > 0) {
        state.cartItems = state.cartItems.map((p) =>
          p.id === action.payload.id ? { ...p, QTY: p.QTY - 1 } : p
        );

        upDateLocalSorage(state.cartItems);
      }
    },
    DELETE: (state, action) => {
      state.cartItems = state.cartItems.filter((p) => p.id !== action.payload);

      upDateLocalSorage(state.cartItems);
    },
    RESET: (state) => {
      state.cartItems = [];
      upDateLocalSorage([]);
    },
  },
});

export const { ADD, DECREASE, DELETE, INCERMENT, RESET } =
  CartShoppingSlice.actions;

export default CartShoppingSlice.reducer;
