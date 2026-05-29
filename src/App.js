import TodoList from "./AllTasks/AllTasks";
// import Alertt from "./AllTasks/AlertOfAchieve";

// theme
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

// OTHERS Libraries
import { v4 as uuidv4 } from "uuid";

// useContext hook
import MyArr from "./contexts/Array";
// import AlertFun from "./contexts/AlertFunc";
import { useState, } from "react";


function App() {
  // initially array
  const todos = [
    {
      id: uuidv4(),
      title: "قراءة كتاب",
      details: " yryrtyrt",
      isCompleted: false,
    },
    {
      id: uuidv4(),
      title: "قراءة كتاب",
      details: "  fhfghfghgf",
      isCompleted: false,
    },
    {
      id: uuidv4(),
      title: "قراءة كتاب",
      details: " ghjgh",
      isCompleted: false,
    },
  ];
  let [readToDos, setToDos] = useState(todos);

  // create theme
  const theme = createTheme({
    palette: {
      primary: {
        main: "#00f",
      },
      secondary: {
        main: "rgb(22, 184, 95)",
      },
      uncomplete: {
        main: "#f00",
      },
    },
  });


  // let { alertEvent } = useContext(AlertFun);

  return (
    <ThemeProvider theme={theme}>
      <alertEvent />
      <MyArr.Provider value={{ readToDos, setToDos }}>
        <div className="App">
          <TodoList />
        </div>
      </MyArr.Provider>
    </ThemeProvider>
  );
}

export default App;
