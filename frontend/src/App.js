import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import React from "react";
import Home from "./components/pages/Home";
import AddExpense from "./components/pages/AddExpense";
import AddIncome from "./components/pages/AddIncome";
import Menu from "./components/common/Menu";

export default function App() {
  return (
    <Router>
      <div>
        <Route path="/:page?">
          <Menu />
        </Route>
        <Switch>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          <Route path="/add-expense">
            <AddExpense />
          </Route>
          <Route path="/add-income">
            <AddIncome />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
