import { createSlice } from '@reduxjs/toolkit';
import { getAllOrdersProcess } from '../../api';
export const getAllOrdersSlice = createSlice({
  name: 'getAllOrders',
  initialState: {
    isLoading: {},
    status: {},
    message: {},
    data: undefined,
  },
  reducers: {
    resetAllOrders: state => {
      state.data = undefined;
      state.isLoading = {};
      state.status = {};
      state.message = {};
    },
  },
  extraReducers: {
    [getAllOrdersProcess.pending]: state => {
      state.isLoading = { ...state.isLoading, getAllOrdersProcess: true };
    },
    [getAllOrdersProcess.fulfilled]: (state, action) => {
      state.isLoading = { ...state.isLoading, getAllOrdersProcess: false };
      state.status = {
        ...state.status,
        getAllOrdersProcess: action.payload?.status,
      };
      state.message = {
        ...state.message,
        getAllOrdersProcess: action.payload?.message,
      };
      state.data = action.payload?.orders;
    },
    [getAllOrdersProcess.rejected]: (state, action) => {
      state.isLoading = { ...state.isLoading, getAllOrdersProcess: false };
    },
  },
});

export const { resetAllOrders } = getAllOrdersSlice.actions;
export default getAllOrdersSlice.reducer;