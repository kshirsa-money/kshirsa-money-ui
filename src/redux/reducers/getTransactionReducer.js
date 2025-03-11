import { createSlice } from "@reduxjs/toolkit";
import getTransactionAction from "../actions/getTransactionAction";
import { GET_TRANSACTION } from "../actions/types";

const initialState = {
  data: null,
  loading: false,
  error: null,
  success: null,
  message: null,
};

const getTransactionReducer = createSlice({
  name: GET_TRANSACTION,
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
        state.message = null;
      })
      .addCase(getTransactionAction.fulfilled, (state, action) => {
        const { data, success, message } = action.payload;
        state.loading = false;
        state.data = data;
        state.success = success;
        state.message = message;
      })
      .addCase(getTransactionAction.rejected, (state, action) => {
        const { errorDetails, success, message } = action.payload
        state.loading = false;
        state.error = errorDetails;
        state.success = success || false;
        state.message = message;
      });
  },
});

// export const { 
//   RESET_GET_RECENT_TRANSACTION: resetgetRecentTransactionsAction
//  } = getTransactionReducer.actions;
export default getTransactionReducer.reducer;
