import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Select } from "@blueprintjs/select";
import { Button, MenuItem, Spinner } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";

export default function AddEntry({ type, categories, onSubmit }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const history = useHistory();

  const handleTitle = (e) => setTitle(e.target.value);
  const handleAmount = (e) => setAmount(e.target.value);

  function handleClick() {
    if (title && amount && category && date) {
      setLoading(true);
      onSubmit(date.toLocaleString(), title, amount, category);
      setLoading(false);
      history.push("/");
    } else {
      setError("Please fill all fields");
    }
  }
  return (
    <div className="form">
      <div className="container">
        <h2>Add {type}</h2>
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
        {error && <div style={{ color: "red", fontSize: "9pt" }}>{error}</div>}

        <div className="input-container">
          <button onClick={handleClick}>Add</button>
          {loading && <Spinner size={Spinner.SIZE_SMALL} />}
        </div>
      </div>
    </div>
  );
}
