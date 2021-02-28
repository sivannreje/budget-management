import React from "react";
import AddEntry from "../common/AddEntry";

import { useDispatch } from "react-redux";
import { addExpense } from "../../requests";
import * as categories from "../../categories";

export default function AddExpense() {
  const dispatch = useDispatch();

  function handleSubmit(date, title, amount, category) {
    dispatch(
      addExpense({
        date,
        title,
        amount,
        category,
      })
    );
  }
  return (
    <AddEntry
      type="Expense"
      categories={categories.EXPENSES_CATEGORIES}
      onSubmit={handleSubmit}
    />
  );
}
