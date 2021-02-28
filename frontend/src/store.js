import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expensesSlice";
import incomesReducer from "./incomesSlice";

export default configureStore({
  reducer: {
    expenses: expensesReducer,
    incomes: incomesReducer,
  },
});
