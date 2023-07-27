import {createSlice} from '@reduxjs/toolkit';
import {getMusteriOrdersProcess} from '../../api';
export const getMusteriOrdersSlice = createSlice({
  name: 'getProductDetail',
  initialState: {
    isLoading: {},
    status: {},
    message: {},
    data: undefined,
  },
  reducers: {
    resetMusteriOrders: state => {
      state.data = undefined;
      state.isLoading = {};
      state.status = {};
      state.message = {};
    },
  },
  extraReducers: {
    [getMusteriOrdersProcess.pending]: state => {
      state.isLoading = {...state.isLoading, getMusteriOrdersProcess: true};
    },
    [getMusteriOrdersProcess.fulfilled]: (state, action) => {
      state.isLoading = {...state.isLoading, getMusteriOrdersProcess: false};
      state.status = {
        ...state.status,
        getMusteriOrdersProcess: action.payload?.status,
      };
      state.message = {
        ...state.message,
        getMusteriOrdersProcess: action.payload?.message,
      };
      state.data = action.payload?.orders;
    },
    [getMusteriOrdersProcess.rejected]: (state, action) => {
      state.isLoading = {...state.isLoading, getMusteriOrdersProcess: false};
    },
  },
});

export const {resetMusteriOrders} = getMusteriOrdersSlice.actions;
export default getMusteriOrdersSlice.reducer;