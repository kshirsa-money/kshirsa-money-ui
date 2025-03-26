import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_ALL_TRANSACTIONS } from "./types";
import { fetchData, sendData } from "../../api/apiUtils";
import urls from "../../api/url";

const getAllTransactionsAction = createAsyncThunk(
    GET_ALL_TRANSACTIONS,
    async (queryParams, { rejectWithValue }) => {
        try {
          const response = await fetchData({
            endpoint: urls.getAllTransactions,
            queryParams
          }); 
          console.log('get-all-transactions-action: ', response);
          return response;
        } catch (error) {
          console.log('get-all-transactions-action-error: ', error);
          return rejectWithValue(error?.response?.data); 
        }
      }
)

export default getAllTransactionsAction;
