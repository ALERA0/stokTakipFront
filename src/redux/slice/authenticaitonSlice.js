  import { createSlice } from "@reduxjs/toolkit";
  import { loginProcess,logoutProcess } from "@/src/api";

  export const authenticationSlice = createSlice({
    name: "authentication",
    initialState: {
      data: undefined,
      isLoading: false,
      error: undefined,
      status: undefined,
      isSignedIn: "-1",
    },

    reducers: {
      checkSignedIn: (state, action) => {
        state.isSignedIn = action.payload && action.payload.status === "success" ? "1" : "0";
      },
    },
    extraReducers: {
      [loginProcess.pending]: (state) => {
        state.isLoading = true;
        state.isSignedIn = "-1";
        
      },
      [loginProcess.fulfilled]: (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.isSignedIn =
          action.payload && action.payload.status === "success" ? "1" : "0";
        state.status = action.payload.status 
        // Hata durumunu sıfırla
      },

      [loginProcess.rejected]: (state, action) => {
        state.status =  action.error.message // Hata mesajını güncelle
        state.isLoading = false;
        state.isSignedIn = "0";
        state.error = action.error.message;
      },
      [logoutProcess.fulfilled]: state => {
        state.isSignedIn = '0';
      },    
    },
  });

  export const { checkSignedIn } = authenticationSlice.actions;

  export default authenticationSlice.reducer;
