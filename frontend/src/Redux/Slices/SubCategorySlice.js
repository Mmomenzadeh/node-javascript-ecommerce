import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetProductSubCategory } from "API/Shop/GetProductSubCategory";

export const fetchSubCategory = createAsyncThunk("fetch/subcategoryList", async () => {
  try {
    const res = await GetProductSubCategory();
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
});

const SubCategorySlice = createSlice({
  name: "subcategoryList",
  initialState: {
    subcategoryData: [],
    error: "",
    loading: "idel",
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSubCategory.pending, (state) => {
      return { ...state, loading: true };
    });

    builder.addCase(fetchSubCategory.fulfilled, (state, action) => {
      return {
        ...state,
        subcategoryData: action.payload,
        loading: false,
      };
    });

    builder.addCase(fetchSubCategory.rejected, (state) => {
      return {
        ...state,
        error: "something went wrong",
        loading: false,
        subcategoryData: [],
      };
    });
  },
});

export default SubCategorySlice.reducer;
