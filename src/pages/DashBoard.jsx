import React from "react";
import { useLoaderData } from "react-router-dom";
import "../assets/css/index.css";

//library
import { toast } from "react-toastify";

//helpers
import { createBudget, fetchData, waitt } from "../helper";

//components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";

export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  return { userName, budgets };
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
}

const DashBoard = () => {
  const { userName, budgets } = useLoaderData();

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            <div className="grid-lg">
              <div className="flex-lg">
                <AddBudgetForm />
              </div>
            </div>
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
