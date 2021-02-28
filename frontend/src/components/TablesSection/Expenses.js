import React, { useState } from "react";
import { useSelector } from "react-redux";
import Table from "../common/Table";
import { Spinner } from "@blueprintjs/core";
import { useDispatch } from "react-redux";
import { editExpense, deleteExpense } from "../../requests";
import EditDialog from "../common/EditDialog";
import * as categories from "../../categories";

export default function Expenses() {
  const COLUMNS = [
    { key: "date", title: "Date" },
    { key: "title", title: "Expense" },
    { key: "amount", title: "Amount" },
    { key: "category", title: "Category" },
  ];
  const { entries } = useSelector((state) => state.expenses);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  function openDialog(item) {
    setDialogOpen(true);
    setEditItem(item);
  }
  function handleEdit(item) {
    setEditItem(false);
    setDialogOpen(false);
    const { id, date, title, amount, category } = item;
    dispatch(
      editExpense({
        id,
        date,
        title,
        amount,
        category,
      })
    );
  }

  function handleDelete(id) {
    dispatch(deleteExpense(id));
  }
  return (
    <div>
      {loading ? (
        <Spinner size={Spinner.SIZE_LARGE} />
      ) : (
        <Table
          columns={COLUMNS}
          data={entries}
          onEdit={openDialog}
          onDelete={handleDelete}
        />
      )}
      {editItem && (
        <EditDialog
          type="Expense"
          categories={categories.EXPENSES_CATEGORIES}
          id={editItem.id}
          oldAmount={editItem.amount}
          oldCategory={editItem.category}
          oldDate={editItem.date}
          oldTitle={editItem.title}
          isOpen={dialogOpen}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}
