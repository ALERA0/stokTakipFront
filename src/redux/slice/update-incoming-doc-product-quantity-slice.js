import { updateIncomingDocProductQuantityProcess } from "../../api/index";
import { createSlice } from "@reduxjs/toolkit";

export const updateIncomingDocProductQuantitySlice = createSlice({
    name: "updateIncomingProductQuantity",
    initialState: {
        data: undefined,
        status: undefined,
        isLoading: false,
    },
    reducers: {
        resetIncomingProductQuantityUpdate: state => {
            state.isLoading = {};
            state.status = {};
            state.message = {};
        },
    },
    extraReducers: {
        [updateIncomingDocProductQuantityProcess.pending]: (state) => {
            state.isLoading = true;
        },
        [updateIncomingDocProductQuantityProcess.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data =
                action.payload?.data !== undefined
                    ? action.payload?.data
                    : action.payload;
            state.status = action.payload?.status;
        },
        [updateIncomingDocProductQuantityProcess.rejected]: (state) => {
            state.isLoading = false;
            state.status = "error";
        }
    },
});

export const { resetIncomingProductQuantityUpdate } = updateIncomingDocProductQuantitySlice.actions;

export default updateIncomingDocProductQuantitySlice.reducer;