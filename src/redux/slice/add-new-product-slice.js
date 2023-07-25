import { addNewProductProcess } from "@/src/api";
import { createSlice } from "@reduxjs/toolkit";

export const addNewProductSlice = createSlice({
  name: "addNewProduct",
  initialState: {
    data: undefined,
    status: undefined,
    isLoading: false,
  },
  extraReducers: {
    [addNewProductProcess.pending]: (state) => {
      state.isLoading = true;
    },
    [addNewProductProcess.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data =
        action.payload?.data !== undefined
          ? action.payload?.data
          : action.payload;
      state.status = action.payload.status;
    },
    [addNewProductProcess.rejected]: (state) => {
        state.isLoading = false;
    }
  },
});

export default addNewProductSlice.reducer;
