import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
//helper functions
import { fetchData } from "../helper";

//components
import Nav from "../components/Nav";

//assets
import wave from "../assets/wave.svg";
import "../assets/css/index.css";

export function mainLoader() {
  const userName = fetchData("userName");
  return { userName };
}

const Main = () => {
  const { userName } = useLoaderData();

  return (
    <div className="layout">
      <Nav userName = {userName}/> 
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="wave" />
    </div>
  );
};

export default Main;
