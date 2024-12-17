import React from "react";

//helpers
import { calculateSpentByBudget, formatCurrency } from "../helper";

const BudgetItem = ({ budget }) => {
  const { id, name, amount, color } = budget;
  const spent = calculateSpentByBudget(id);
  console.log(spent);

  return (
    <div className="budget">
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value="5000">
        {/* percent */}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small>... remaining</small>
      </div>
    </div>
  );
};

export default BudgetItem;
