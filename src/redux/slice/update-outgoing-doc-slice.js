import { updateOutgoingDocProcess } from "../../api/index";
import { createSlice } from "@reduxjs/toolkit";

export const updateOutgoingDocSlice = createSlice({
    name: "updateOutgoingProduct",
    initialState: {
        data: undefined,
        status: undefined,
        isLoading: false,
    },
    reducers: {
        resetUpdateOutgoingDoc: (state) => {
          state.data = undefined;
          state.isLoading = {};
          state.status = {};
        },
      },
    extraReducers: {
        [updateOutgoingDocProcess.pending]: (state) => {
            state.isLoading = true;
        },
        [updateOutgoingDocProcess.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data =
                action.payload?.outgoingProduct !== undefined
                    ? action.payload?.outgoingProduct
                    : action.payload;
            state.status = action.payload?.status;
        },
        [updateOutgoingDocProcess.rejected]: (state) => {
            state.isLoading = false;
      state.status = "error";

        }
    },
});

export const { resetUpdateOutgoingDoc } = updateOutgoingDocSlice.actions;
export default updateOutgoingDocSlice.reducer;