import { createSlice } from '@reduxjs/toolkit';
import { deleteProductFromIncomingProductProcess } from '../../api';


export const deleteProductFromIncomingProductSlice = createSlice({
    name: 'removeProduct',
    initialState: {
        isLoading: {},
        status: {},
        message: {},
    },
    reducers: {
        resetIncomingProductDelete: state => {
            state.isLoading = {};
            state.status = {};
            state.message = {};
        },
    },
    extraReducers: {
        [deleteProductFromIncomingProductProcess.pending]: state => {
            state.isLoading = { ...state.isLoading, deleteProductFromIncomingProductProcess: true };
        },
        [deleteProductFromIncomingProductProcess.fulfilled]: (state, action) => {
            state.isLoading = { ...state.isLoading, deleteProductFromIncomingProductProcess: false };
            state.status = {
                ...state.status,
                deleteProductFromIncomingProductProcess: action.payload?.status,
            };
            state.message = {
                ...state.message,
                deleteProductFromIncomingProductProcess: action.payload?.message,
            };

        },
        [deleteProductFromIncomingProductProcess.rejected]: (state, action) => {
            state.isLoading = { ...state.isLoading, deleteProductFromIncomingProductProcess: false };
            state.status = "error";
        },
    },
});


export const { resetIncomingProductDelete } = deleteProductFromIncomingProductSlice.actions;
export default deleteProductFromIncomingProductSlice.reducer;