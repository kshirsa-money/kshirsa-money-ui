import { createSlice } from "@reduxjs/toolkit";
import getAllTransactionsAction from "../actions/getAllTransactionsAction";
import { GET_ALL_TRANSACTIONS, RESET_GET_ALL_TRANSACTIONS } from "../actions/types";

const initialState = {
  data: null,
  loading: false,
  error: null,
  success: null,
  message: null,
  transactionList: [],
  currentPage: 0,
  infinityLoading: false
};

const getAllTransactionsReducer = createSlice({
  name: GET_ALL_TRANSACTIONS,
  initialState,
  reducers: {
    [RESET_GET_ALL_TRANSACTIONS]: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.success = null;
      state.message = null;
      state.transactionList = [];
      state.currentPage = 1;
      state.infinityLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTransactionsAction.pending, (state, action) => {
        if(action?.meta?.arg?.pageNumber === 1) {
        state.loading = true;
        state.infinityLoading = false;
        } else {
          state.infinityLoading = true
          state.loading = false;
        }
        state.error = null;
        state.success = null;
        state.message = null;
      })
      .addCase(getAllTransactionsAction.fulfilled, (state, action) => {
        const { data, success, message } = action.payload;
        state.loading = false;
        state.infinityLoading = false;
        state.data = data;
        state.currentPage = data?.currentPage;
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

export const { 
  RESET_GET_ALL_TRANSACTIONS: resetGetAllTransactionsAction
 } = getAllTransactionsReducer.actions;
export default getAllTransactionsReducer.reducer;
