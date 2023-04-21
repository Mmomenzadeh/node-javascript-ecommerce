import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetProductCategory } from "API";

export const fetchProductCategory = createAsyncThunk(
  "fetch/categoryList",
  async () => {
    try {
      const res = await GetProductCategory();
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

const ProductCategorySlice = createSlice({
  name: "categoryList",
  initialState: {
    categoryData: [],
    loading: "idle",
    error: "",
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProductCategory.pending, (state) => {
      return { ...state, loading: true };
    });

    builder.addCase(fetchProductCategory.fulfilled, (state, action) => {
      return {
        ...state,
        categoryData: action.payload, 
        loading : false
      };
    });


    builder.addCase(fetchProductCategory.rejected , (state)=>{
        return{
            ...state ,
            error : "some thing wrong" ,
            categoryData :[] ,
            loading : "idle"

        }
    })
  },
});


export default ProductCategorySlice.reducer