import { addIncomingProductToOutgoingProductProcess } from '../../api/index';
import { createSlice } from '@reduxjs/toolkit';

export const addIncomingProductToOutgoingProductSlice = createSlice({
    name: 'addProductToOutgoingProduct',
    initialState: {
        data: undefined,
        status: undefined,
        isLoading: false,
    },
    reducers: {
        resetAddIncomingProductToOutgoingProduct: state => {
            state.data = undefined;
            state.isLoading = {};
            state.status = {};
            state.message = {};
        },
    },
    extraReducers: {
        [addIncomingProductToOutgoingProductProcess.pending]: state => {
            state.isLoading = true;
        },
        [addIncomingProductToOutgoingProductProcess.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data =
                action.payload?.data !== undefined
                    ? action.payload?.data
                    : action.payload;
            state.status = action.payload?.status;
        },
        [addIncomingProductToOutgoingProductProcess.rejected]: state => {
            state.isLoading = false;
            state.status = 'error';

        },
    },
});

export const { resetAddIncomingProductToOutgoingProduct } = addIncomingProductToOutgoingProductSlice.actions;
export default addIncomingProductToOutgoingProductSlice.reducer;

