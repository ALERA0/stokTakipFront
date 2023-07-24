import {createSlice} from '@reduxjs/toolkit';
import {getAllProductsProcess} from '../../api';
export const getAllProductsSlice = createSlice({
  name: 'getAllProducts',
  initialState: {
    isLoading: {},
    status: {},
    message: {},
    data: undefined,
  },
  reducers: {
    resetAllProducts: state => {
      state.data = undefined;
      state.isLoading = {};
      state.status = {};
      state.message = {};
    },
  },
  extraReducers: {
    [getAllProductsProcess.pending]: state => {
      state.isLoading = {...state.isLoading, getAllProductsProcess: true};
    },
    [getAllProductsProcess.fulfilled]: (state, action) => {
      state.isLoading = {...state.isLoading, getAllProductsProcess: false};
      state.status = {
        ...state.status,
        getAllProductsProcess: action.payload?.status,
      };
      state.message = {
        ...state.message,
        getAllProductsProcess: action.payload?.message,
      };
      state.data = action.payload?.products;
    },
    [getAllProductsProcess.rejected]: (state, action) => {
      state.isLoading = {...state.isLoading, getAllProductsProcess: false};
    },
  },
});
export const {resetAllProducts} = getAllProductsSlice.actions;
export default getAllProductsSlice.reducer;