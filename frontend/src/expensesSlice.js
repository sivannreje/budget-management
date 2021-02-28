import { createSlice } from "@reduxjs/toolkit";
import { addExpense, expenses, editExpense, deleteExpense } from "./requests";

const expensesReducer = {
  [expenses.pending]: (state, action) => {
    state.loading = true;
  },
  [expenses.fulfilled]: (state, action) => {
    state.loading = false;
    state.entries = action.payload;
  },
  [expenses.rejected]: (state, action) => {
    state.loading = false;
  },
};

const addExpenseReducer = {
  [addExpense.pending]: (state, action) => {
    state.loading = true;
  },
  [addExpense.fulfilled]: (state, action) => {
    state.loading = false;
    state.entries.push(action.payload);
  },
  [addExpense.rejected]: (state, action) => {
    state.loading = false;
  },
};

const editExpenseReducer = {
  [editExpense.pending]: (state, action) => {
    state.loading = true;
  },
  [editExpense.fulfilled]: (state, action) => {
    const { id, date, title, amount, category } = action.payload;
    const existingExpense = state.entries.find((expense) => expense.id === id);
    if (existingExpense) {
      existingExpense.date = date;
      existingExpense.title = title;
      existingExpense.amount = amount;
      existingExpense.category = category;
    }
  },
  [editExpense.rejected]: (state, action) => {
    state.loading = false;
  },
};

const deleteExpenseReducer = {
  [deleteExpense.pending]: (state, action) => {
    state.loading = true;
  },
  [deleteExpense.fulfilled]: (state, action) => {
    const id = action.payload;
    const existingEntry = state.entries.find((entry) => entry.id === id);
    if (existingEntry) {
      state.entries = state.entries.filter((entry) => entry.id !== id);
    }
  },
  [deleteExpense.rejected]: (state, action) => {
    state.loading = false;
  },
};
const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    entries: [],
    loading: false,
  },
  reducers: {},
  extraReducers: {
    ...addExpenseReducer,
    ...expensesReducer,
    ...editExpenseReducer,
    ...deleteExpenseReducer,
  },
});

export default expensesSlice.reducer;
