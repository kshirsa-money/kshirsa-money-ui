import { createAsyncThunk } from "@reduxjs/toolkit";
import { UPDATE_TRANSACTION } from "./types";
import { sendData  } from "../../api/apiUtils";
import urls from "../../api/url";

const updateTransactionAction = createAsyncThunk(
  UPDATE_TRANSACTION,
    async (body, { rejectWithValue }) => {
        try {
            const response = await sendData({
              endpoint: urls.updateTransaction,
              body,
              method: 'put',
  
            }); 
            return response;
          } catch (error) {
            return rejectWithValue(error.response?.data || error.message); 
          }
        }
)

export default updateTransactionAction;