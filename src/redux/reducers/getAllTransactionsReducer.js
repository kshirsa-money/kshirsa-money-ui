import { createSlice } from "@reduxjs/toolkit";
import getAllTransactionsAction from "../actions/getAllTransactionsAction";
import { GET_ALL_TRANSACTIONS } from "../actions/types";

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

const getAllTransactionsReducer = createSlice({
  name: GET_ALL_TRANSACTIONS,
  initialState,
//   reducers: {
//     [RESET_GET_RECENT_TRANSACTION]: (state) => {
//       state.data = null;
//       state.loading = false;
//       state.error = null;
//       state.success = null;
//       state.message = null;
//     }
//   },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTransactionsAction.pending, (state) => {
        if(state.currentPage === 1) {
        state.loading = true;
        }
        state.error = null;
        state.success = null;
        state.message = null;
        state.infinityLoading = true;
      })
      .addCase(getAllTransactionsAction.fulfilled, (state, action) => {
        const { data, success, message } = action.payload;
        state.loading = false;
        state.infinityLoading = false;
        state.data = data;
        console.log(data?.currentPage, ' reducerPage')
        state.currentPage = data?.currentPage || 1;
        if (data?.currentPage === 1) {
          state.transactionList = data?.transactionList || [];
        } else {
          state.transactionList = [...state.transactionList, ...data?.transactionList];
        }
        state.success = success;
        state.message = message;
      })
      .addCase(getAllTransactionsAction.rejected, (state, action) => {
        const { errorDetails, success, message } = action.payload
        state.loading = false;
        state.error = errorDetails;
        state.success = success || false;
        state.message = message;
      });
  },
});

// export const { 
//   RESET_GET_RECENT_TRANSACTION: resetgetAllTransactionsAction
//  } = getAllTransactionsReducer.actions;
export default getAllTransactionsReducer.reducer;
