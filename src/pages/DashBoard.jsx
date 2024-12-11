import React from "react";
import { useLoaderData } from "react-router-dom";
import "../assets/css/index.css";

//library
import { toast } from "react-toastify";

//helpers
import { fetchData } from "../helper";

//components
import Intro from "../components/Intro";

export function dashboardLoader() {
  const userName = fetchData("userName");
  return { userName };
}

//action
export async function dashboardAction({ request }) {
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  try {
  //  throw new Error('yy');
    localStorage.setItem("userName", JSON.stringify(formData.userName));
    return toast.success(`Welcome, ${formData.userName}`);
  } catch (e) {
    throw new Error("There was a problem creating your account");
  }
}

const DashBoard = () => {
  const { userName } = useLoaderData();

  return (
    <>
      {userName ? <p>{userName}</p> : <Intro />}
      {/* <> </> -  fragments to wrap*/}
    </>
  );
};

export default DashBoard;
