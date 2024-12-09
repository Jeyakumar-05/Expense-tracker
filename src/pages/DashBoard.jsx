import React from "react";
import { useLoaderData } from "react-router-dom";

//helpers
import { fetchData } from "../helper";

//components
import Intro from "../components/Intro";

export function dashboardLoader() {
  const userName = fetchData("userName");
  return { userName };
}

const DashBoard = () => {
  const { userName } = useLoaderData();

  return <>
  {userName ? <p>{userName}</p> : <Intro />}    {/* <> </> -  fragments to wrap*/}
  </>;
};

export default DashBoard;
