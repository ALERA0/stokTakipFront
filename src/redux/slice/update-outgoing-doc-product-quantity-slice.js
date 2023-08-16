import { updateOutgoingDocProductQuantityProcess } from "../../api/index";
import { createSlice } from "@reduxjs/toolkit";

export const updateOutgoingDocProductQuantitySlice = createSlice({
    name: "updateOutgoingProductQuantity",
    initialState: {
        data: undefined,
        status: undefined,
        isLoading: false,
    },
    reducers: {
        resetOutgoingProductQuantityUpdate: state => {
            state.isLoading = {};
            state.status = {};
            state.message = {};
        },
    },
    extraReducers: {
        [updateOutgoingDocProductQuantityProcess.pending]: (state) => {
            state.isLoading = true;
        },
        [updateOutgoingDocProductQuantityProcess.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data =
                action.payload?.data !== undefined
                    ? action.payload?.data
                    : action.payload;
            state.status = action.payload?.status;
        },
        [updateOutgoingDocProductQuantityProcess.rejected]: (state) => {
            state.isLoading = false;
            state.status = "error";
        }
    },
});
export const { resetOutgoingProductQuantityUpdate } = updateOutgoingDocProductQuantitySlice.actions;

export default updateOutgoingDocProductQuantitySlice.reducer;