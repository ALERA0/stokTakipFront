import { createSlice } from '@reduxjs/toolkit';
import { getIncomingTransactionsProcess } from '../../api';
export const getIncomingTransactionsSlice = createSlice({
    name: 'listTransactions',
    initialState: {
        isLoading: {},
        status: {},
        message: {},
        data: undefined,
    },
    reducers: {
        resetIncomingTransactions: state => {
            state.data = undefined;
            state.isLoading = {};
            state.status = {};
            state.message = {};
        },
    },
    extraReducers: {
        [getIncomingTransactionsProcess.pending]: state => {
            state.isLoading = { ...state.isLoading, getIncomingTransactionsProcess: true };
        },
        [getIncomingTransactionsProcess.fulfilled]: (state, action) => {
            state.isLoading = { ...state.isLoading, getIncomingTransactionsProcess: false };
            state.status = {
                ...state.status,
                getIncomingTransactionsProcess: action.payload?.status,
            };
            state.message = {
                ...state.message,
                getIncomingTransactionsProcess: action.payload?.message,
            };
            state.data = action.payload?.data;
        },
        [getIncomingTransactionsProcess.rejected]: (state, action) => {
            state.isLoading = { ...state.isLoading, getIncomingTransactionsProcess: false };
        },
    },
});
export const { resetIncomingTransactions } = getIncomingTransactionsSlice.actions;
export default getIncomingTransactionsSlice.reducer;
