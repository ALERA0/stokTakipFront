import { updateOutgoingDocProductQuantityProcess } from "../../api/index";
import { createSlice } from "@reduxjs/toolkit";

export const updateOutgoingDocProductQuantitySlice = createSlice({
    name: "updateOutgoingProductQuantity",
    initialState: {
        data: undefined,
        status: undefined,
        isLoading: false,
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
        }
    },
});

export default updateOutgoingDocProductQuantitySlice.reducer;