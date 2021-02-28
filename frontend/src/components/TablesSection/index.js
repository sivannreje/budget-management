import React from "react";
import { Tab, Tabs } from "@blueprintjs/core";
import Expenses from "./Expenses";
import Incomes from "./Incomes";
import { Classes } from "@blueprintjs/core";

export default function TableSection() {
  return (
    <div style={{ padding: "0 20px" }}>
      <Tabs id="tabs">
        <Tab id="expenses" title="Expenses" panel={<Expenses />} />
        <Tab
          id="incomes"
          title="Incomes"
          panel={<Incomes />}
          panelClassName={Classes.TAB_PANEL}
        />
        <Tabs.Expander />
      </Tabs>
    </div>
  );
}
