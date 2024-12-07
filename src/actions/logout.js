import { redirect } from "react-router-dom";

//helpers
import { deleteItem } from "../helper";

export async function logoutAction() {
  deleteItem({
    key: "userName",
  });
  // return redirect
  return redirect("/");
}
