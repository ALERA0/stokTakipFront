import { createSlice } from '@reduxjs/toolkit';
import { deleteProductFromOutgoingProductProcess } from '../../api';


export const deleteProductFromOutgoingProductSlice = createSlice({
    name: 'removeOutgoingProduct',
    initialState: {
        isLoading: {},
        status: {},
        message: {},
    },
    reducers: {
        resetOutgoingProductDelete: state => {
            state.isLoading = {};
            state.status = {};
            state.message = {};
        },
    },
    extraReducers: {
        [deleteProductFromOutgoingProductProcess.pending]: state => {
            state.isLoading = { ...state.isLoading, deleteProductFromOutgoingProductProcess: true };
        },
        [deleteProductFromOutgoingProductProcess.fulfilled]: (state, action) => {
            state.isLoading = { ...state.isLoading, deleteProductFromOutgoingProductProcess: false };
            state.status = {
                ...state.status,
                deleteProductFromOutgoingProductProcess: action.payload?.status,
            };
            state.message = {
                ...state.message,
                deleteProductFromOutgoingProductProcess: action.payload?.message,
            };

        },
        [deleteProductFromOutgoingProductProcess.rejected]: (state, action) => {
            state.isLoading = { ...state.isLoading, deleteProductFromOutgoingProductProcess: false };
            state.status = "error";

        },
    },
});


export const { resetOutgoingProductDelete } = deleteProductFromOutgoingProductSlice.actions;
export default deleteProductFromOutgoingProductSlice.reducer;