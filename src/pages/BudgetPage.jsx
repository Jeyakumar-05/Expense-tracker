import React from "react";

// router-dom
import { useLoaderData } from "react-router-dom";

//helpers
import { createExpense, deleteItem, getAllMatchingItems, waitt } from "../helper";

//components
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";

// library
import { toast } from "react-toastify";

//loader
export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("The budget doesn't exist");
  }

  return { budget, expenses };
}

//actions
export async function budgetAction({ request }) {

    await waitt();
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

  if (_action == "deleteExpense") {
    try {
      //delete expense
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted");
    } catch (e) {
      throw new Error("There was a problem creating your exxpense.");
    }
  }

  if (_action == "createExpense") {
    try {
      //create expense
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created`);
    } catch (e) {
      throw new Error("There was a problem creating your expense.");
    }
  }

}

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();

  return (
    <div className="grid-lg"
    style={{
        "--accent" : budget.color,
    }}
    >
      <h1 className="h2">
        <span className="accent">{budget.name}</span>
        {" "}Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true}/>
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">
              {budget.name}
            </span>
            {" "}Expenses
          </h2>
          <Table expenses={expenses} showBudget ={false} />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
