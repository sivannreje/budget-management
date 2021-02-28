import React, { useState } from "react";
import { Dialog, Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { DateInput } from "@blueprintjs/datetime";

export default function EditDialog({
  type,
  categories,
  isOpen,
  id,
  oldDate,
  oldTitle,
  oldAmount,
  oldCategory,
  onEdit,
}) {
  const [title, setTitle] = useState(oldTitle);
  const [error, setError] = useState("");
  const [amount, setAmount] = useState(oldAmount);
  const [category, setCategory] = useState(oldCategory);
  const [date, setDate] = useState(new Date(oldDate));

  const [open, setOpen] = useState(isOpen);

  function toggleDialog() {
    setOpen(!open);
  }

  function handleClick() {
    if (title && amount && category && date) {
      const dateAsString = date.toLocaleString();
      onEdit({ id, date: dateAsString, title, amount, category });
      toggleDialog();
    } else {
      setError("Please fill all fields");
    }
  }

  const handleTitle = (e) => setTitle(e.target.value);
  const handleAmount = (e) => setAmount(e.target.value);
  return (
    <Dialog icon="inbox" isOpen={open} onClose={toggleDialog} title="Edit">
      <div className="form">
        <div className="container">
          <h2>Edit {type}</h2>
          <div className="input-container">
            <label>Date:</label>

            <DateInput
              formatDate={(date) => date.toLocaleString()}
              onChange={setDate}
              parseDate={(str) => new Date(str)}
              placeholder={"DD-MM-YYYY"}
              value={date}
            />
          </div>
          <div className="input-container">
            <label>{type}:</label>
            <input
              type="text"
              placeholder={`insert ${type}`}
              id="titleInput"
              onChange={handleTitle}
              value={title}
            />
          </div>
          <div className="input-container">
            <label>Amount:</label>
            <input
              type="number"
              min="0.00"
              placeholder="insert amount"
              id="amountInput"
              onChange={handleAmount}
              value={amount}
            />
          </div>
          <div className="input-container">
            <label>Choose Category:</label>
            <Select
              items={categories}
              filterable={false}
              itemRenderer={(item, { handleClick }) => (
                <MenuItem
                  key={item}
                  text={item}
                  onClick={handleClick}
                  shouldDismissPopover={true}
                />
              )}
              onItemSelect={setCategory}
            >
              <Button
                text={category || "Please choose a category"}
                rightIcon="caret-down"
              />
            </Select>
          </div>
          {error && (
            <div style={{ color: "red", fontSize: "9pt" }}>{error}</div>
          )}

          <div className="input-container">
            <button onClick={handleClick}>Edit</button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
