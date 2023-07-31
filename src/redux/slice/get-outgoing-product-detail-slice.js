import { createSlice } from '@reduxjs/toolkit';
import { getOutgoingProductDetailProcess } from '../../api';
export const getOutgoingProductDetailSlice = createSlice({
    name: 'outgoingProductdetail',
    initialState: {
        isLoading: {},
        status: {},
        message: {},
        data: undefined,
    },
    reducers: {
        resetOutgoingProductDetail: state => {
            state.data = undefined;
            state.isLoading = {};
            state.status = {};
            state.message = {};
        },
    },
    extraReducers: {
        [getOutgoingProductDetailProcess.pending]: state => {
            state.isLoading = { ...state.isLoading, getOutgoingProductDetailProcess: true };
        },
        [getOutgoingProductDetailProcess.fulfilled]: (state, action) => {
            state.isLoading = { ...state.isLoading, getOutgoingProductDetailProcess: false };
            state.status = {
                ...state.status,
                getOutgoingProductDetailProcess: action.payload?.status,
            };
            state.message = {
                ...state.message,
                getOutgoingProductDetailProcess: action.payload?.message,
            };
            state.data = action.payload?.data;
        },
        [getOutgoingProductDetailProcess.rejected]: (state, action) => {
            state.isLoading = { ...state.isLoading, getOutgoingProductDetailProcess: false };
        },
    },
});
export const { resetOutgoingProductDetail } = getOutgoingProductDetailSlice.actions;
export default getOutgoingProductDetailSlice.reducer;