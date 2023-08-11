import { updateIncomingDocProductQuantityProcess } from "../../api/index";
import { createSlice } from "@reduxjs/toolkit";

export const updateIncomingDocProductQuantitySlice = createSlice({
    name: "updateIncomingProductQuantity",
    initialState: {
        data: undefined,
        status: undefined,
        isLoading: false,
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
        }
    },
});

export default updateIncomingDocProductQuantitySlice.reducer;