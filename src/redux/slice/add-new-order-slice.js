import { addNewOrderProcess } from "../../api/index";
import { createSlice } from "@reduxjs/toolkit";

export const addNewOrderSlice = createSlice({
  name: "newOrder",
  initialState: {
    data: undefined,
    status: undefined,
    isLoading: false,
  },
  reducers: {
    resetAddOrder: (state) => {
      state.data = undefined;
      state.isLoading = {};
      state.status = {};
    },
  },
  extraReducers: {
    [addNewOrderProcess.pending]: (state) => {
      state.isLoading = true;
    },
    [addNewOrderProcess.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data =
        action.payload?.savedOrder !== undefined
          ? action.payload?.savedOrder
          : action.payload;
      state.status = action.payload?.status;
    },
    [addNewOrderProcess.rejected]: (state) => {
      state.isLoading = false;
      state.status = "error";
    },
  },
});

export const { resetAddOrder } = addNewOrderSlice.actions;
export default addNewOrderSlice.reducer;
