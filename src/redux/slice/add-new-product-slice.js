import { addNewProductProcess } from "@/src/api";
import { createSlice } from "@reduxjs/toolkit";

export const addNewProductSlice = createSlice({
  name: "addNewProduct",
  initialState: {
    data: undefined,
    status: undefined,
    isLoading: false,
  },
  reducers: {
    resetAddProduct: state => {
      state.data = undefined;
      state.isLoading = {};
      state.status = {};
  },
  },
  extraReducers: {
    // İşlem başladığında (pending)
    [addNewProductProcess.pending]: (state) => {
      state.isLoading = true;
    },
    // İşlem tamamlandığında (fulfilled)
    [addNewProductProcess.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload; // Assuming the response data contains the necessary data, including 'status'.
      state.status = action.payload?.status; // Safely access 'status' property using optional chaining.
    },
    // İşlem başarısız olduğunda (rejected)
    [addNewProductProcess.rejected]: (state) => {
      state.isLoading = false;
      state.error = "Ürün eklenirken bir hata oluştu";
      state.status = "error";
    },
  },
});


export const { resetAddProduct } = addNewProductSlice.actions;
export default addNewProductSlice.reducer;
