import React from "react";
import { useLoaderData } from "react-router-dom";
import "../assets/css/index.css";

//library
import { toast } from "react-toastify";

//helpers
import { fetchData } from "../helper";

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
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  try {
    localStorage.setItem("userName", JSON.stringify(formData.userName));
    return toast.success(`Welcome, ${formData.userName}`);
  } catch (e) {
    throw new Error("There was a problem creating your account");
  }
}

const DashBoard = () => {
  const { userName, budgets } = useLoaderData();

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>Welcome back, <span className="accent">
            {userName}
            </span></h1>
            <div className="grid-sm">

            <div className="grid-lg">
              <div className="flex-lg">
                <AddBudgetForm />
              </div>
            </div>
            </div>
        </div>
      ) : <Intro />}
      {/* <> </> -  fragments to wrap*/}
    </>
  );
};

export default DashBoard;
