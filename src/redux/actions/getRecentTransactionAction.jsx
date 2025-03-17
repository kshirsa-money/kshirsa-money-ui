import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_RECENT_TRANSACTION } from "./types";
import { fetchData } from "../../api/apiUtils";
import urls from "../../api/url";

const getRecentTransactionsAction = createAsyncThunk(
    GET_RECENT_TRANSACTION,
    async (_, { rejectWithValue }) => {
        try {
          const response = await fetchData({
            endpoint: urls.getRecentTransactions
          }); 
          return response;
        } catch (error) {
          return rejectWithValue(error?.response?.data); 
        }
      }
)

export default getRecentTransactionsAction;
