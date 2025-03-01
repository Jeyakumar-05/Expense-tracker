import React from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

//helper
import { deleteItem, fetchData } from "../helper";
import Table from "./Table";

export async function expensesLoader() {
  const expenses = await fetchData("expenses");
  return { expenses };
}

export async function expensesAction({ request }) {
 
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
}

const ExpensesPage = () => {
  const { expenses } = useLoaderData();

  return (
    <div className="grid-lg">
      <h1>All expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p> No Expenses to show </p>
      )}
    </div>
  );
};

export default ExpensesPage;
