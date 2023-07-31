import { updateIncomingProductQuantityProcess } from "../../api/index";
import { createSlice } from "@reduxjs/toolkit";

export const updateIncomingProductQuantitySlice = createSlice({
    name: "updateIncomingProductQuantity",
    initialState: {
        data: undefined,
        status: undefined,
        isLoading: false,
    },
    extraReducers: {
        [updateIncomingProductQuantityProcess.pending]: (state) => {
            state.isLoading = true;
        },
        [updateIncomingProductQuantityProcess.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data =
                action.payload?.data !== undefined
                    ? action.payload?.data
                    : action.payload;
            state.status = action.payload?.status;
        },
        [updateIncomingProductQuantityProcess.rejected]: (state) => {
            state.isLoading = false;
        }
    },
});

export default updateIncomingProductQuantitySlice.reducer;