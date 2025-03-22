import { createSlice } from "@reduxjs/toolkit";
import getAllTransactionsFilterAction from "../actions/getAllTransactionsFilterAction";
import { GET_ALL_TRANSACTION_FILTER } from "../actions/types";

const initialState = {
  data: null,
  loading: false,
  error: null,
  success: null,
  message: null,
  transactionList: [],
  currentPage: 1,
  infinityLoading: false
};

const getAllTransactionsFilterReducer = createSlice({
  name: GET_ALL_TRANSACTION_FILTER,
  initialState,
//   reducers: {
//     [RESET_GET_ALL_TRANSACTIONS]: (state) => {
//       state.data = null;
//       state.loading = false;
//       state.error = null;
//       state.success = null;
//       state.message = null;
//       state.transactionList = [];
//       state.currentPage = 1;
//       state.infinityLoading = false;
//     }
//   },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTransactionsFilterAction.pending, (state) => {
        state.error = null;
        state.success = null;
        state.message = null;
        state.infinityLoading = true;
      })
      .addCase(getAllTransactionsFilterAction.fulfilled, (state, action) => {
        const { data, success, message } = action.payload;
        state.loading = false;
        state.infinityLoading = false;
        state.data = data;
        state.success = success;
        state.message = message;
      })
      .addCase(getAllTransactionsFilterAction.rejected, (state, action) => {
        const { errorDetails, success, message } = action.payload
        state.loading = false;
        state.error = errorDetails;
        state.success = success || false;
        state.message = message;
      });
  },
});

// export const { 
//   RESET_GET_ALL_TRANSACTIONS: resetGetAllTransactionsFilterAction
//  } = getAllTransactionsFilterReducer.actions;
export default getAllTransactionsFilterReducer.reducer;
