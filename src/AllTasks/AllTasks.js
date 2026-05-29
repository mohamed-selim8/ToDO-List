import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
// use Effect hook
import { useEffect } from "react";

// memo hook
import { useMemo } from "react";
import "../App.css";
// Components
import Todo from "./Task";

// OTHERS Libraries
import { v4 as uuidv4 } from "uuid";

// useState hook
import { useState } from "react";

// useContext
import { useContext } from "react";
import MyArr from "../contexts/Array";
import AlertFun from "../contexts/AlertFunc";
export default function TodoList() {
  //==== get tasks from local storage===//
  useEffect(() => {
    var getTasksFromStorage = JSON.parse(localStorage.getItem("myTodos"));
    if (getTasksFromStorage === null) {
      getTasksFromStorage = [];
    }
    setToDos(getTasksFromStorage);
  }, []);

  // use global array
  let { readToDos, setToDos } = useContext(MyArr);

  // useState to input
  let [readInputVal, setInputVal] = useState("");

  // useState to filteration buttons
  let [readFilter, setFilter] = useState("all");

  // Context For Alert
  let { alertEvent } = useContext(AlertFun);
  console.log(alertEvent);

  //====filter results WITH REFACT OF CODE====//
  let completed = useMemo(() => {
    return readToDos.filter((e) => {
      return e.isCompleted;
    });
  }, [readToDos]);
  let notCompleted = useMemo(() => {
    return readToDos.filter((e) => {
      return !e.isCompleted;
    });
  }, [readToDos]);

  let allResults = readToDos;

  if (readFilter === "completed") {
    allResults = completed;
  } else if (readFilter === "!completed") {
    allResults = notCompleted;
  } else {
    allResults = readToDos;
  }

  // show results based on button filter
  const myTodos = allResults.map((item) => {
    return <Todo key={item.id} tasks={item} />;
  });
  //===== add new task====//
  function setInArr() {
    if (
      readInputVal === "" ||
      readInputVal.trim().length < 6 ||
      readInputVal.indexOf(".") === 0 ||
      readInputVal.indexOf("/") === 0
    ) {
      alert("");
      return false;
    } else {
      let newTask = {
        id: uuidv4(),
        title: readInputVal,
        details: "",
        isCompleted: false,
      };

      let clone = [...readToDos];
      clone.push(newTask);
      setToDos(clone);
      setInputVal("");
      localStorage.setItem("myTodos", JSON.stringify(clone));
      alertEvent("add successfully");
    }
  }

  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275, maxHeight: "95vh", overflowY: "scroll" }}>
        <CardContent>
          <Typography
            variant="h2"
            style={{ fontWeight: "bold", textAlign: "center" }}
          >
            <span style={{ color: "teal" }}>My </span>

            <span style={{ color: "orange" }}>Tasks</span>
          </Typography>

          {/* horizontal line */}
          <Divider />

          {/* FILTER BUTTONS */}
          <ToggleButtonGroup
            value={readFilter}
            className="my-1"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            style={{
              direction: "ltr",
              margin: "auto",
            }}
            exclusive
            aria-label="text alignment"
          >
            <ToggleButton
              value="all"
              color="primary"
              style={{ fontWeight: "900" }}
            >
              All
            </ToggleButton>
            <ToggleButton
              value="completed"
              color="secondary"
              style={{ fontWeight: "900" }}
            >
              Completed
            </ToggleButton>
            <ToggleButton
              value="!completed"
              color="uncomplete"
              style={{ fontWeight: "900" }}
            >
              !completed
            </ToggleButton>
          </ToggleButtonGroup>
          {/* ==== FILTER BUTTON ==== */}

          {/* ALL TODOS */}
          {myTodos}
          {/* === ALL TODOS === */}

          {/* INPUT + ADD BUTTON */}
          <Grid container style={{ marginTop: "20px" }} spacing={2}>
            <Grid
              size={{ xs: 12, sm: 10 }}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="task...."
                variant="outlined"
                value={readInputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                }}
              />
            </Grid>

            <Grid
              size={{ xs: 12, sm: 2 }}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <Button
                color="primary"
                style={{ width: "100%", height: "100%" }}
                variant="contained"
                onClick={() => setInArr()}
                disabled={readInputVal <= 0 ? true : false}
              >
                Add
              </Button>
            </Grid>
          </Grid>
          {/*== INPUT + ADD BUTTON ==*/}
        </CardContent>
      </Card>
    </Container>
  );
}
