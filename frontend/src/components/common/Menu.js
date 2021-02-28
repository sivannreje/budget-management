import React from "react";
import { useHistory } from "react-router-dom";

export default function Menu() {
  const history = useHistory();

  function navigate(url) {
    history.push(url);
  }
  return (
    <nav className="bp3-navbar bp3-dark" style={{ marginBottom: "10px" }}>
      <div style={{ margin: "0 auto", width: "95%" }}>
        <div className="bp3-navbar-group bp3-align-left">
          <div className="bp3-navbar-heading">Budget Management</div>
        </div>
        <div className="bp3-navbar-group bp3-align-right">
          <button
            className="bp3-button bp3-minimal bp3-icon-home"
            onClick={() => navigate("/")}
          >
            Home
          </button>

          <span className="bp3-navbar-divider"></span>
          <button
            className="bp3-button bp3-minimal bp3-icon-add bp3-intent-danger"
            onClick={() => navigate("/add-expense")}
          >
            Add Expense
          </button>
          <button
            className="bp3-button bp3-minimal bp3-icon-add bp3-intent-success"
            onClick={() => navigate("/add-income")}
          >
            Add Income
          </button>
        </div>
      </div>
    </nav>
  );
}
