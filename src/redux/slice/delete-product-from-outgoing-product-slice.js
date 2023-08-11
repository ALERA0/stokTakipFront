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
        resetProductDelete: state => {
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
        },
    },
});


export const { resetProductDelete } = deleteProductFromOutgoingProductSlice.actions;
export default deleteProductFromOutgoingProductSlice.reducer;