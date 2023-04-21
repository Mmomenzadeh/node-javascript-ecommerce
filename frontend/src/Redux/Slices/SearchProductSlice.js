import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SearchProductAPI } from "API";

export const SearchProduct = createAsyncThunk(
  "searchProduct/slice",
  async (params) => {
    try {
      const res = await SearchProductAPI(params);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

 const SearchProductSlice = createSlice({
  name: "searchProduct/filteredData",
  initialState: {
    loading: "idel",
    FilteredData: [],
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(SearchProduct.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(SearchProduct.fulfilled, (state, action) => {
      return {
        ...state,
        FilteredData: action.payload,
        loading: false,
      };
    });
    builder.addCase(SearchProduct.rejected, (state) => {
      return {
        ...state,
        error: "something went wrong",
      };
    });
  },
});

export default SearchProductSlice.reducer;
