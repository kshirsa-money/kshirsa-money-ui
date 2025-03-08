import { createAsyncThunk } from "@reduxjs/toolkit";
import { DELETE_TRANSACTION } from "./types";
import { sendData } from "../../api/apiUtils";
import urls from "../../api/url";

const deleteTransactionAction = createAsyncThunk(
    DELETE_TRANSACTION,
    async (queryParams, { rejectWithValue }) => {
        try {
            const response = await sendData({
              endpoint: urls.deleteTransaction,
              queryParams,
              method: 'delete',
            }); 
            return response;
          } catch (error) {
            return rejectWithValue(error.response?.data || error.message); 
          }
        }
)

export default deleteTransactionAction;