import {createSlice} from '@reduxjs/toolkit';
import {getTedarikciOrdersProcess} from '../../api';
export const getTedarikciOrdersSlice = createSlice({
  name: 'getTedarikciOrders',
  initialState: {
    isLoading: {},
    status: {},
    message: {},
    data: undefined,
  },
  reducers: {
    resetTedarikciOrders: state => {
      state.data = undefined;
      state.isLoading = {};
      state.status = {};
      state.message = {};
    },
  },
  extraReducers: {
    [getTedarikciOrdersProcess.pending]: state => {
      state.isLoading = {...state.isLoading, getTedarikciOrdersProcess: true};
    },
    [getTedarikciOrdersProcess.fulfilled]: (state, action) => {
      state.isLoading = {...state.isLoading, getTedarikciOrdersProcess: false};
      state.status = {
        ...state.status,
        getTedarikciOrdersProcess: action.payload?.status,
      };
      state.message = {
        ...state.message,
        getTedarikciOrdersProcess: action.payload?.message,
      };
      state.data = action.payload?.orders;
    },
    [getTedarikciOrdersProcess.rejected]: (state, action) => {
      state.isLoading = {...state.isLoading, getTedarikciOrdersProcess: false};
    },
  },
});

export const {resetTedarikciOrders} = getTedarikciOrdersSlice.actions;
export default getTedarikciOrdersSlice.reducer;