import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const expenses = createAsyncThunk("expenses/getExpenses", async () => {
  const response = await axios.get("/api/expenses");
  const expenses = await response.data.expenses;
  return expenses;
});

export const incomes = createAsyncThunk("incomes/getIncomes", async () => {
  const response = await axios.get("/api/incomes");
  const incomes = response.data.incomes;
  return incomes;
});

export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async (item) => {
    const response = await axios.post("/api/add_expense", item);
    const id = response.data.id;
    item.id = id;
    return item;
  }
);

export const addIncome = createAsyncThunk("incomes/addIncome", async (item) => {
  const response = await axios.post("/api/add_income", item);
  const id = response.data.id;
  item.id = id;
  return item;
});

export const editExpense = createAsyncThunk(
  "expenses/editExpense",
  async (item) => {
    await axios.post("/api/edit_expense", item);
    return item;
  }
);

export const editIncome = createAsyncThunk(
  "incomes/editIncome",
  async (item) => {
    await axios.post("/api/edit_income", item);
    return item;
  }
);

export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async (id) => {
    console.log({ id });
    await axios.post("/api/delete_expense", { id });
    return id;
  }
);

export const deleteIncome = createAsyncThunk(
  "incomes/deleteIncome",
  async (id) => {
    await axios.post("/api/delete_income", { id });
    return id;
  }
);
