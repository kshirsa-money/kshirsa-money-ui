import { createSlice } from "@reduxjs/toolkit";
import getRecentTransactionsAction from "../actions/getRecentTransactionAction";
import { GET_RECENT_TRANSACTION, RESET_GET_RECENT_TRANSACTION } from "../actions/types";

const initialState = {
  data: null,
  loading: false,
  error: null,
  success: null,
  message: null,
};

const generateOtpReducer = createSlice({
  name: GET_RECENT_TRANSACTION,
  initialState,
  reducers: {
    [RESET_GET_RECENT_TRANSACTION]: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.success = null;
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecentTransactionsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
        state.message = null;
      })
      .addCase(getRecentTransactionsAction.fulfilled, (state, action) => {
        const { data, success, message } = action.payload;
        state.loading = false;
        state.data = data;
        state.success = success;
        state.message = message;
      })
      .addCase(getRecentTransactionsAction.rejected, (state, action) => {
        const { errorDetails, success, message } = action.payload
        state.loading = false;
        state.error = errorDetails;
        state.success = success || false;
        state.message = message;
      });
  },
});

export const { 
  RESET_GET_RECENT_TRANSACTION: resetgetRecentTransactionsAction
 } = generateOtpReducer.actions;
export default generateOtpReducer.reducer;
