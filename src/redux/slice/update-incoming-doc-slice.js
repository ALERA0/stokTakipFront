import { updateIncomingDocProcess } from "../../api/index";
import { createSlice } from "@reduxjs/toolkit";

export const updateIncomingDocSlice = createSlice({
    name: "updateIncomingProduct",
    initialState: {
        data: undefined,
        status: undefined,
        isLoading: false,
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
        }
    },
});

export default updateIncomingDocSlice.reducer;