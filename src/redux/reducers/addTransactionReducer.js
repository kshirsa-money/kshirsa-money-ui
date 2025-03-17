import { createSlice } from "@reduxjs/toolkit";
import addTransactionAction from "../actions/addTransactionAction";
import { ADD_TRANSACTION, RESET_ADD_TRANSACTION } from "../actions/types";

const initialState = {
  data: null,
  loading: false,
  error: null,
  success: null,
  message: null,
};

const addTransactionReducer = createSlice({
  name: ADD_TRANSACTION,
  initialState,
   reducers: {
      [RESET_ADD_TRANSACTION]: (state) => {
        state.data = null;
        state.loading = false;
        state.error = null;
        state.success = null;
        state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTransactionAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
        state.message = null;
      })
      .addCase(addTransactionAction.fulfilled, (state, action) => {
        const { data, success, message } = action.payload;
        state.loading = false;
        state.data = data;
        state.success = success;
        state.message = message;
      })
      .addCase(addTransactionAction.rejected, (state, action) => {
        const { errorDetails, success, message } = action.payload
        state.loading = false;
        state.error = errorDetails;
        state.success = success || false;
        state.message = message;
      });
  },
});

export const { 
  RESET_ADD_TRANSACTION: resetaddTransactionAction
 } = addTransactionReducer.actions;
export default addTransactionReducer.reducer;
