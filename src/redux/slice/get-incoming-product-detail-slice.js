import { createSlice } from '@reduxjs/toolkit';
import { getIncomingProductDetailProcess } from '../../api';
export const getIncomingProductDetailSlice = createSlice({
    name: 'incomingProductdetail',
    initialState: {
        isLoading: {},
        status: {},
        message: {},
        data: undefined,
    },
    reducers: {
        resetIncomingProductDetail: state => {
            state.data = undefined;
            state.isLoading = {};
            state.status = {};
            state.message = {};
        },
    },
    extraReducers: {
        [getIncomingProductDetailProcess.pending]: state => {
            state.isLoading = { ...state.isLoading, getIncomingProductDetailProcess: true };
        },
        [getIncomingProductDetailProcess.fulfilled]: (state, action) => {
            state.isLoading = { ...state.isLoading, getIncomingProductDetailProcess: false };
            state.status = {
                ...state.status,
                getIncomingProductDetailProcess: action.payload?.status,
            };
            state.message = {
                ...state.message,
                getIncomingProductDetailProcess: action.payload?.message,
            };
            state.data = action.payload?.data;
        },
        [getIncomingProductDetailProcess.rejected]: (state, action) => {
            state.isLoading = { ...state.isLoading, getIncomingProductDetailProcess: false };
        },
    },
});
export const { resetIncomingProductDetail } = getIncomingProductDetailSlice.actions;
export default getIncomingProductDetailSlice.reducer;