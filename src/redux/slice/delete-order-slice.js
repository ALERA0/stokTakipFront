import { createSlice } from "@reduxjs/toolkit";
import { deleteOrderProcess } from "../../api";
export const deleteOrderSlice = createSlice({
  name: "deleteOrder",
  initialState: {
    isLoading: {},
    status: {},
    message: {},
  },
  reducers: {
    resetDeleteOrder: (state) => {
      state.isLoading = {};
      state.status = {};
      state.message = {};
    },
  },
  extraReducers: {
    [deleteOrderProcess.pending]: (state) => {
      state.isLoading = { ...state.isLoading, deleteOrderProcess: true };
    },
    [deleteOrderProcess.fulfilled]: (state, action) => {
      state.isLoading = { ...state.isLoading, deleteOrderProcess: false };
      state.status = {
        ...state.status,
        deleteOrderProcess: action.payload?.status,
      };
      state.message = {
        ...state.message,
        deleteOrderProcess: action.payload?.message,
      };
    },
    [deleteOrderProcess.rejected]: (state, action) => {
      state.isLoading = { ...state.isLoading, deleteOrderProcess: false };
      state.status = "error";
    },
  },
});
export const { resetDeleteOrder } = deleteOrderSlice.actions;
export default deleteOrderSlice.reducer;
