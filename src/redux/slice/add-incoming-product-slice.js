import { addIncomingProductProcess } from "../../api/index";
import { createSlice } from "@reduxjs/toolkit";

export const addIncomingProductSlice = createSlice({
    name: "addIncomingProduct",
    initialState: {
        data: undefined,
        status: undefined,
        isLoading: false,
    },
    reducers: {
        resetAddIncomingProduct: state => {
            state.data = undefined;
            state.isLoading = {};
            state.status = {};
            state.message = {};
        },
    },
    extraReducers: {
        [addIncomingProductProcess.pending]: (state) => {
            state.isLoading = true;
        },
        [addIncomingProductProcess.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data =
                action.payload?.data !== undefined
                    ? action.payload?.data
                    : action.payload;
            state.status = action.payload?.status;
        },
        [addIncomingProductProcess.rejected]: (state) => {
            state.isLoading = false;
        }
    },
});

export const { resetAddIncomingProduct } = addIncomingProductSlice.actions;
export default addIncomingProductSlice.reducer;