import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashBoard, { dashboardLoader } from "./pages/DashBoard";
import Error from "./pages/Error";
import Main, { mainLoader } from "./layouts/Main";
import "./assets/css/index.css"

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
    ],
  },
]);

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
