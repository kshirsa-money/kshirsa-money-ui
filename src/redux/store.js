import { configureStore } from "@reduxjs/toolkit";
import fontsSlice from "./reducers/fontReducer";
import validateOtpReducer from "./reducers/validateOtpReducer";
import generateOtpReducer from "./reducers/generateOtpReducer";
import userDetailsReducer from "./reducers/userDetailsReducer";
import addTransactionReducer from "./reducers/addTransactionReducer";
import getRecentTransactionsReducer from "./reducers/getRecentTransactionsReducer";
import deleteTransactionReducer from "./reducers/deleteTransactionReducer";
import getTransactionReducer from "./reducers/getTransactionReducer";
import updateTransactionReducer from "./reducers/updateTransactionReducer";
import viewCategoriesReducer from "./reducers/viewCategoriesReducer";
import savedFormDataReducer from "./reducers/savedFormDataReducer";
import updateCategoryReducer from "./reducers/updateCategoryReducer";
import addCategoryReducer from "./reducers/addCategoryReducer";
import deleteCategoryReducer from "./reducers/deleteCategoryReducer";
import getAllTransactionsReducer from "./reducers/getAllTransactionsReducer";

const KshirsaStore = configureStore({
    reducer: {
      fonts: fontsSlice.reducer,
      generateOtpReducer: generateOtpReducer,
      validateOtpReducer: validateOtpReducer,
      userDetailsReducer: userDetailsReducer,
      addTransactionReducer: addTransactionReducer,
      getRecentTransactionsReducer: getRecentTransactionsReducer,
      deleteTransactionReducer: deleteTransactionReducer,
      getTransactionReducer: getTransactionReducer,
      updateTransactionReducer: updateTransactionReducer,
      savedFormDataReducer: savedFormDataReducer,
      viewCategoriesReducer: viewCategoriesReducer,
      updateCategoryReducer: updateCategoryReducer,
      addCategoryReducer: addCategoryReducer,
      deleteCategoryReducer: deleteCategoryReducer,
      allTransactionsReducer: getAllTransactionsReducer,
    },
  });

  export default KshirsaStore;