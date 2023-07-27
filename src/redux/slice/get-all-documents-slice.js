import { createSlice } from '@reduxjs/toolkit';
import { getAllDocumentsProcess } from '../../api';
export const getAllDocumentsSlice = createSlice({
  name: 'allDocuments',
  initialState: {
    isLoading: {},
    status: {},
    message: {},
    data: undefined,
  },
  reducers: {
    resetAllDocuments: state => {
      state.data = undefined;
      state.isLoading = {};
      state.status = {};
      state.message = {};
    },
  },
  extraReducers: {
    [getAllDocumentsProcess.pending]: state => {
      state.isLoading = { ...state.isLoading, getAllDocumentsProcess: true };
    },
    [getAllDocumentsProcess.fulfilled]: (state, action) => {
      state.isLoading = { ...state.isLoading, getAllDocumentsProcess: false };
      state.status = {
        ...state.status,
        getAllDocumentsProcess: action.payload?.status,
      };
      state.message = {
        ...state.message,
        getAllDocumentsProcess: action.payload?.message,
      };
      state.data = action.payload?.data;
    },
    [getAllDocumentsProcess.rejected]: (state, action) => {
      state.isLoading = { ...state.isLoading, getAllDocumentsProcess: false };
    },
  },
});

export const { resetAllDocuments } = getAllDocumentsSlice.actions;
export default getAllDocumentsSlice.reducer;