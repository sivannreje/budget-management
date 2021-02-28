import React from "react";
import AddEntry from "../common/AddEntry";
import { addIncome } from "../../requests";
import { useDispatch } from "react-redux";
import * as categories from "../../categories";

export default function AddIncome() {
  const dispatch = useDispatch();

  function handleSubmit(date, title, amount, category) {
    dispatch(
      addIncome({
        date,
        title,
        amount,
        category,
      })
    );
  }
  return (
    <AddEntry
      type="Income"
      categories={categories.INCOMES_CATEGORIES}
      onSubmit={handleSubmit}
    />
  );
}
