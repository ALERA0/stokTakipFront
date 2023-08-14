import { updateIncomingDocProcess } from "../../api/index";
import { createSlice } from "@reduxjs/toolkit";

export const updateIncomingDocSlice = createSlice({
  name: "updateIncomingProduct",
  initialState: {
    data: undefined,
    status: undefined,
    isLoading: false,
  },
  reducers: {
    resetUpdateIncomingDoc: (state) => {
      state.data = undefined;
      state.isLoading = {};
      state.status = {};
    },
  },
  extraReducers: {
    [updateIncomingDocProcess.pending]: (state) => {
      state.isLoading = true;
    },
    [updateIncomingDocProcess.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data =
        action.payload?.incomingProduct !== undefined
          ? action.payload?.incomingProduct
          : action.payload;
      state.status = action.payload?.status;
    },
    [updateIncomingDocProcess.rejected]: (state) => {
      state.isLoading = false;
      state.status = "error";
    },
  },
});
export const { resetUpdateIncomingDoc } = updateIncomingDocSlice.actions;
export default updateIncomingDocSlice.reducer;
