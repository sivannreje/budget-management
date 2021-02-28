import { createSlice } from "@reduxjs/toolkit";
import { addIncome, incomes, editIncome, deleteIncome } from "./requests";

const incomesReducer = {
  [incomes.pending]: (state, action) => {
    state.loading = true;
  },
  [incomes.fulfilled]: (state, action) => {
    state.loading = false;
    state.entries = action.payload;
  },
  [incomes.rejected]: (state, action) => {
    state.loading = false;
  },
};

const addIncomeReducer = {
  [addIncome.pending]: (state, action) => {
    state.loading = true;
  },
  [addIncome.fulfilled]: (state, action) => {
    state.loading = false;
    state.entries.push(action.payload);
  },
  [addIncome.rejected]: (state, action) => {
    state.loading = false;
  },
};

const editIncomeReducer = {
  [editIncome.pending]: (state, action) => {
    state.loading = true;
  },
  [editIncome.fulfilled]: (state, action) => {
    const { id, date, title, amount, category } = action.payload;
    const existingIncome = state.entries.find((income) => income.id === id);
    if (existingIncome) {
      existingIncome.date = date;
      existingIncome.title = title;
      existingIncome.amount = amount;
      existingIncome.category = category;
    }
  },
  [editIncome.rejected]: (state, action) => {
    state.loading = false;
  },
};

const deleteIncomeReducer = {
  [deleteIncome.pending]: (state, action) => {
    state.loading = true;
  },
  [deleteIncome.fulfilled]: (state, action) => {
    const id = action.payload;
    const existingEntry = state.entries.find((entry) => entry.id === id);
    if (existingEntry) {
      state.entries = state.entries.filter((entry) => entry.id !== id);
    }
  },
  [deleteIncome.rejected]: (state, action) => {
    state.loading = false;
  },
};

const incomesSlice = createSlice({
  name: "incomes",
  initialState: {
    entries: [],
    loading: false,
  },
  reducers: {},
  extraReducers: {
    ...addIncomeReducer,
    ...incomesReducer,
    ...editIncomeReducer,
    ...deleteIncomeReducer,
  },
});

export default incomesSlice.reducer;
