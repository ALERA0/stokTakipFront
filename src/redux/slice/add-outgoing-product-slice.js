import { addOutgoingProductProcess } from "../../api/index";
import { createSlice } from "@reduxjs/toolkit";

export const addOutgoingProductSlice = createSlice({
    name: "addOutgoingProduct",
    initialState: {
        data: undefined,
        status: undefined,
        isLoading: false,
    },
    reducers: {
        resetAddOutgoingProduct: state => {
            state.data = undefined;
            state.isLoading = {};
            state.status = {};
            state.message = {};
        },
    },
    extraReducers: {
        [addOutgoingProductProcess.pending]: (state) => {
            state.isLoading = true;
        },
        [addOutgoingProductProcess.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data =
                action.payload?.data !== undefined
                    ? action.payload?.data
                    : action.payload;
            state.status = action.payload?.status;
        },
        [addOutgoingProductProcess.rejected]: (state) => {
            state.isLoading = false;
        }
    },
});

export const { resetAddOutgoingProduct } = addOutgoingProductSlice.actions;
export default addOutgoingProductSlice.reducer;