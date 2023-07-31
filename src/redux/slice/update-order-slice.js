import { updateOrderProcess } from "../../api/index";
import { createSlice } from "@reduxjs/toolkit";

export const updateOrderSlice = createSlice({
    name: "updateOrder",
    initialState: {
        data: undefined,
        status: undefined,
        isLoading: false,
    },
    extraReducers: {
        [updateOrderProcess.pending]: (state) => {
            state.isLoading = true;
        },
        [updateOrderProcess.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data =
                action.payload?.updateOrder !== undefined
                    ? action.payload?.updateOrder
                    : action.payload;
            state.status = action.payload?.status;
        },
        [updateOrderProcess.rejected]: (state) => {
            state.isLoading = false;
        }
    },
});

export default updateOrderSlice.reducer;