import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_CATEGORIES } from "./types";
import { fetchData, sendData } from "../../api/apiUtils";
import urls from "../../api/url";

const viewCategoriesAction = createAsyncThunk(
    GET_CATEGORIES,
    async (_, { rejectWithValue }) => {
        try {
          const response = await fetchData({
            endpoint: urls.getCategories,
          }); 
          console.log('get-category-action: ', response);
          return response;
        } catch (error) {
          console.log(error, 'error from user details')
          return rejectWithValue(error?.response?.data); 
        }
      }
)

export default viewCategoriesAction;
