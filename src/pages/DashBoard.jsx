import React from "react";
import { fetchData } from "../helper";
import { useLoaderData } from "react-router-dom";

export function dashboardloader() {
  const userName = fetchData("userName");
  return { userName };
}

const DashBoard = () => {
  
  const {userName} = useLoaderData()

  return <div>
    <h1>{userName}</h1>
  Dashboard
  </div>;
};

export default DashBoard;
