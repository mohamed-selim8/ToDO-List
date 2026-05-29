import { createContext, useState } from "react";
import Alertt from "../AllTasks/AlertOfAchieve";

let AlertFun = createContext({});

export let AlertProvider = ({ children }) => {
  // ALERT BAR STATE
  const [open, setOpen] = useState(false);
  let [readMsg, setMsg] = useState("");

  function alertEvent(msg) {
    setOpen(true);
    setMsg(msg);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }
  return (
    <AlertFun.Provider value={{ alertEvent }}>
      <Alertt openIt={open} msg={readMsg} />
      {children}
    </AlertFun.Provider>
  );
};

export default AlertFun;
