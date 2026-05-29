import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useRef } from "react";
export default function Alertt({ openIt, msg }) {
  let sty = useRef();

  // variable to handel background of alert msg
  let stl = "";
  // ternary operator to check type of msg
  msg === "add successfully" || msg === "this task achieved"
    ? (stl = "success")
    : msg === "deleted successed"
      ? (stl = "error")
      : msg === "work hard to acheive it"
        ? (stl = "info")
        : (stl = "warning");

  return (
    <div>
      <Snackbar open={openIt}>
        <Alert variant="filled" severity={stl} ref={sty}>
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
}
