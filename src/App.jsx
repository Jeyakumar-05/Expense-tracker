import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/css/index.css";

//library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//layouts
import Main, { mainLoader } from "./layouts/Main";

//routes
import DashBoard, { dashboardAction, dashboardLoader } from "./pages/DashBoard";
import Error from "./pages/Error";

//actions
import { logoutAction } from "./actions/logout";

//components
import ExpensesPage, {
  expensesAction,
  expensesLoader,
} from "./components/ExpensesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true, //default child
        element: <DashBoard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction,
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
