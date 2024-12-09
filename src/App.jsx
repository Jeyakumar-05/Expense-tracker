import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/css/index.css";

//Library
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Layouts 
import Main, { mainLoader } from "./layouts/Main";

//Routes
import DashBoard, { dashboardLoader } from "./pages/DashBoard";
import Error from "./pages/Error";

//Actions
import { logoutAction } from "./actions/logout";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <DashBoard />,
        loader: dashboardLoader,
        errorElement: <Error />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
};

export default App;
