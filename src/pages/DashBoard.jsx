import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import "../assets/css/index.css";

//library
import { toast } from "react-toastify";

//helpers
import { createBudget, createExpense, deleteItem, fetchData, waitt } from "../helper";

//components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
}

//action
export async function dashboardAction({ request }) {
  await waitt();
  /* During this delay, the await keyword pauses the execution of the dashboardAction function 
  until the waitt() promise resolves. */
  // The res argument in setTimeout(res, ...) is the function that "resolves" the Promise (takes upto 0 to 1.999secs).

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (e) {
      throw new Error("There was a problem creating your account");
    }
  }

  if (_action === "createBudget") {
    try {
      //create budget
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Budget created!");
    } catch (e) {
      throw new Error("There was a problem creating your budget.");
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
      throw new Error("There was a problem creating your exxpense.");
    }
  }

  if (_action == "deleteExpense") {
    try {
      //delete expense
      deleteItem({
        key:"expenses",
        id:values.expenseId,
      });
      return toast.success("Expense deleted");
    } catch (e) {
      throw new Error("There was a problem creating your exxpense.");
    }
  }
}

const DashBoard = () => {
  const { userName, budgets, expenses } = useLoaderData();

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Recent Expenses</h2>

                    <Table
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 8)}
                    />
                    {expenses.length > 8 && (
                      <Link to="expenses" className="btn btn--dark">
                        View all expenses
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
      {/* <> </> -  fragments to wrap*/}
    </>
  );
};

export default DashBoard;
