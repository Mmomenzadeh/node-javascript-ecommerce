import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetSingleProduct } from "API";

export const fetchProduct = createAsyncThunk("fetch/productDetails", async (id) => {
  try {
    const res = await GetSingleProduct(id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

const SingleProductSlice = createSlice({
  name: "productDetails",
  initialState: {
    loading: "idel",
    productDetails: {},
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      return {
        ...state,
        productDetails: action.payload,
        loading: false,
      };
    });

    builder.addCase(fetchProduct.rejected, (state) => {
      return {
        ...state,
        error: "somthing went wrong",
        productDetails: {},
        loading: false,
      };
    });
  },
});

export default SingleProductSlice.reducer;
