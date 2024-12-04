import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashBoard, { dashboardloader } from "./pages/DashBoard";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashBoard />,
    loader: dashboardloader,
    errorElement: <Error />,
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
