import { updateProductProcess } from "../../api/index";
import { createSlice } from "@reduxjs/toolkit";

export const updateProductSlice = createSlice({
  name: "productUpdate",
  initialState: {
    data: undefined,
    status: undefined,
    isLoading: false,
  },
  reducers: {
    resetUpdateProduct: (state) => {
      state.data = undefined;
      state.status = undefined;
      state.isLoading = false;
    },
  },
  extraReducers: {
    [updateProductProcess.pending]: (state) => {
      state.isLoading = true;
    },
    [updateProductProcess.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data =
        action.payload?.updatedProduct !== undefined
          ? action.payload?.updatedProduct
          : action.payload;
      state.status = action.payload?.status;
    },
    [updateProductProcess.rejected]: (state) => {
      state.isLoading = false;
      state.status = "error";
    },
  },
});

export const { resetUpdateProduct } = updateProductSlice.actions;
export default updateProductSlice.reducer;
