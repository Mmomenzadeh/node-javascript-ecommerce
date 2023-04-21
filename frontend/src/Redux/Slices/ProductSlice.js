import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FilterData, GetProduct, PostProduct, UploadImgService } from "API";
import { toast } from "react-toastify";

export const fetchProducts = createAsyncThunk("fetch/productList", async (params) => {
  try {
    const res = await GetProduct(params);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
});



export const fetchFilterData = createAsyncThunk(
  "filterData/productList",
  async (params) => {
    try {
      const res = await FilterData(params);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createProduct = createAsyncThunk(
  "postProduct/productList",
  async (data) => {
    const res = await PostProduct(data)
    return res.data
  }
);

const ProductSlice = createSlice({
  name: "productList",
  initialState: {
    productData: [],
    loading: "idle",
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      return {
        ...state,
        productData: action.payload,
        loading: false,
      };
    });

    builder.addCase(fetchProducts.rejected, (state) => {
      return {
        ...state,
        error: "some thing wrong",
        productData: [],
        loading: "idel",
      };
    });

    /// Filtering :

    builder.addCase(fetchFilterData.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(fetchFilterData.fulfilled, (state, action) => {
      return {
        ...state,
        productData: action.payload,
        loading: false,
      };
    });

    builder.addCase(fetchFilterData.rejected, (state) => {
      return {
        ...state,
        error: "something went wrong",
        productData: [],
        loading: false,
      };
    });

    // post data _ create Product
    builder.addCase(createProduct.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        productData: [...state.productData, action.payload],
      };
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        productData: [],
        error: action.payload,
      };
    });
  },
});

export default ProductSlice.reducer;
