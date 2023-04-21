import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FilterData, GetOrders } from "API";

export const fetchOrders = createAsyncThunk("fetch/ordersList", async () => {
  try {
    const res = await GetOrders();
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
});

export const fetchFilterOrders = createAsyncThunk(
  "filterDataOrder/ordersList",
  async (params) => {
    // console.log(params);
    try { 
      const res = await FilterData(params);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const OrderSlice = createSlice({
  name: "ordersList",
  initialState: {
    ordersData: [],
    loading: "idle",
    error: "",
  },

  extraReducers: (builder) => {

    builder.addCase(fetchOrders.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      return {
        ...state,
        ordersData: action.payload,
        loading: false,
      };
    });

    builder.addCase(fetchOrders.rejected, (state) => {
      return {
        ...state,
        error: "something went wrong",
        loading: "idel",
        ordersData: [],
      };
    });

    /// Filter Data :
    builder.addCase(fetchFilterOrders.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(fetchFilterOrders.fulfilled, (state, action) => {
      return {
        ...state,
        ordersData: action.payload,
        loading: false,
      };
    });

    builder.addCase(fetchFilterOrders.rejected, (state) => {
      return {
        ...state,
        error: "something went wrong",
        ordersData: [],
        loading: false,
      };
    });
  },
});

export default OrderSlice.reducer;
