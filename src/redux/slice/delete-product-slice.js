import { createSlice } from '@reduxjs/toolkit';
import { productDeleteProcess } from '../../api';
export const productDeleteSlice = createSlice({
    name: 'productDelete',
    initialState: {
        isLoading: {},
        status: {},
        message: {},
    },
    reducers: {
        resetProductDetail: state => {
            state.isLoading = {};
            state.status = {};
            state.message = {};
        },
    },
    extraReducers: {
        [productDeleteProcess.pending]: state => {
            state.isLoading = { ...state.isLoading, productDeleteProcess: true };
        },
        [productDeleteProcess.fulfilled]: (state, action) => {
            state.isLoading = { ...state.isLoading, productDeleteProcess: false };
            state.status = {
                ...state.status,
                productDeleteProcess: action.payload?.status,
            };
            state.message = {
                ...state.message,
                productDeleteProcess: action.payload?.message,
            };

        },
        [productDeleteProcess.rejected]: (state, action) => {
            state.isLoading = { ...state.isLoading, productDeleteProcess: false };
        },
    },
});
export const { resetProductDetail } = productDeleteSlice.actions;
export default productDeleteSlice.reducer;