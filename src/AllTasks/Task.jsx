import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
// ICONS
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

// useContext
import { useContext } from "react";
import MyArr from "../contexts/Array";
import AlertFun from "../contexts/AlertFunc";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
// useState hook
import { useState } from "react";

export default function Todo({ tasks }) {
  // context to use array as global
  let { readToDos, setToDos } = useContext(MyArr);
  let { alertEvent } = useContext(AlertFun);

  // useState to alert delete
  let [readAlert, setAlert] = useState(false);
  // useState to update
  let [readUpdate, setUpdate] = useState(false);

  // state to inputs of edit task val
  let [editInputVal, setInputVal] = useState({
    editTitle: tasks.title,
    editDetail: tasks.details,
  });

  // achive task
  function checkIt() {
    let idBtn = readToDos.map((e) => {
      if (e.id === tasks.id) {
        // change status of task`s complete
        e.isCompleted = !e.isCompleted;
      }
      return e;
    });
    setToDos(idBtn);

    localStorage.setItem("myTodos", JSON.stringify(idBtn));

    // check state of acheive button to show alert msg
    tasks.isCompleted
      ? alertEvent("this task achieved")
      : alertEvent("work hard to acheive it");
  }

  // open alert when delete event
  function deletItem() {
    setAlert(true);
  }

  // delete specific task
  function deleting() {
    let deleteIt = readToDos.filter((e) => {
      if (e.id === tasks.id) {
        return false;
      } else {
        return true;
      }

      // return e.id != tasks.id
    });

    // updata array
    setToDos(deleteIt);
    localStorage.setItem("myTodos", JSON.stringify(deleteIt));
    alertEvent("deleted successed");
  }

  // open alert when update event
  function editEvent() {
    setUpdate(true);
  }

  // edit task
  function editNow() {
    let editTask = readToDos.map((e) => {
      if (e.id === tasks.id) {
        return {
          ...e,
          title: editInputVal.editTitle,
          details: editInputVal.editDetail,
        };
      } else {
        return e;
      }
    });

    setToDos(editTask);
    localStorage.setItem("myTodos", JSON.stringify(editTask));
    alertEvent("Edit successfull");
  }

  return (
    <>
      {/* alert when deleting item */}
      <Dialog open={readAlert} aria-describedby="alert-dialog-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setAlert(false);
            }}
          >
            Disagree
          </Button>
          <Button
            variant="contained"
            color="uncomplete"
            onClick={() => {
              // close alert
              setAlert(false);
              // then invok delete
              deleting();
            }}
            autoFocus
          >
            Yes, I agree
          </Button>
        </DialogActions>
      </Dialog>
      {/* ==== END ALERT COMPONENT ==== */}

      {/* alert when update item */}
      <Dialog open={readUpdate} aria-describedby="alert-dialog-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              autoFocus
              margin="dense"
              id="edit"
              name="text"
              label="eidt task"
              type="text"
              fullWidth
              variant="standard"
              value={editInputVal.editTitle}
              onChange={(e) => {
                console.log(e);

                setInputVal({ ...editInputVal, editTitle: e.target.value });
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="details"
              name="text"
              label="details"
              type="text"
              fullWidth
              variant="standard"
              value={editInputVal.editDetail}
              onChange={(e) => {
                setInputVal({ ...editInputVal, editDetail: e.target.value });
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setUpdate(false);
            }}
          >
            ignore
          </Button>
          <Button
            variant="outlined"
            autoFocus
            onClick={() => {
              // close editEvent modal
              setUpdate(false);

              // then update tasks now
              editNow();
            }}
          >
            Edit Now
          </Button>
        </DialogActions>
      </Dialog>
      {/* ==== END ALERT UPDATE COMPONENT ==== */}

      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: tasks.isCompleted ? "green" : "#283593",
          color: "white",
          marginTop: 4,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "left",
                  width: "100%",
                  textDecoration: tasks.isCompleted ? "line-through" : "none",
                }}
              >
                {tasks.title}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  textAlign: "left",
                  width: "100%",
                  textDecoration: tasks.isCompleted ? "line-through" : "none",
                }}
              >
                {tasks.details}
              </Typography>
            </Grid>

            {/* ACTION BUTTONS */}
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                className="iconButton"
                aria-label="check"
                style={{
                  color: tasks.isCompleted ? "#8bc34a" : "#000",
                  background: tasks.isCompleted ? "green" : "white",
                  border: "solid #8bc34a 3px",
                }}
                onClick={checkIt}
              >
                <CheckIcon />
              </IconButton>

              <IconButton
                className="iconButton"
                aria-label="edit"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px",
                }}
                onClick={editEvent}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>

              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px",
                }}
                onClick={deletItem}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Grid>
            {/*== ACTION BUTTONS ==*/}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
