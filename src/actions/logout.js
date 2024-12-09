import { redirect } from "react-router-dom";

//Library
import { toast } from "react-toastify";


//helpers
import { deleteItem } from "../helper";

export async function logoutAction() {
  deleteItem({
    key: "userName",
  });
 toast.success("Account deleted successfully");

  // return redirect
  return redirect("/");
}
