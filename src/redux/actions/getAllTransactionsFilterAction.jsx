import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_ALL_TRANSACTION_FILTER } from "./types";
import { fetchData } from "../../api/apiUtils";
import urls from "../../api/url";

const getAllTransactionsFilterAction = createAsyncThunk(
    GET_ALL_TRANSACTION_FILTER,
    async (_, { rejectWithValue }) => {
        try {
          const response = await fetchData({
            endpoint: urls.getTransactionsFilter,
          }); 
          console.log('get-all-transactions-filter-action: ', response);
          return response;
        } catch (error) {
          console.log('get-all-transactions-filter-action-error: ', error);
          return rejectWithValue(error?.response?.data); 
        }
      }
)

export default getAllTransactionsFilterAction;
