import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_TRANSACTION } from "./types";
import { fetchData } from "../../api/apiUtils";
import urls from "../../api/url";

const getTransactionAction = createAsyncThunk(
    GET_TRANSACTION,
    async (transactionId, { rejectWithValue }) => {
        try {
          const response = await fetchData({
            endpoint: urls.getTransaction,
            pathParams: transactionId,
          }); 
          console.log('get-transaction-action', response);
          return response;
        } catch (error) {
          return rejectWithValue(error?.response?.data); 
        }
      }
)

export default getTransactionAction;
