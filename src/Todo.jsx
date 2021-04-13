import { ListItemText } from "@material-ui/core";
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { Modal } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React from "react";
import db from "./firebase";
import DeleteIcon from "@material-ui/icons/Delete";
import { useState } from "react";
import { Input } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const updateTodo = () => {
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <h1>I am a modal</h1>
          <Input
            placeholder={props.todo.todo}
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
          <Button variant="contained" color="secondary" onClick={updateTodo}>
            update todo
          </Button>
        </div>
      </Modal>

      <List
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ListItem style={{ textAlign: "center" }}>
          <ListItemText primary={props.todo.todo} secondary="deadline-here" />

          <Button
            style={{
              backgroundColor: "#FBBF24",
              border: "none",
              borderRadius: "0.2rem",
              fontSize: "10px",
              fontWeight: "bold",
            }}
            onClick={() => setOpen(true)}
          >
            Edit
          </Button>
          <DeleteIcon
            style={{ fontSize: "2rem" }}
            onClick={() => db.collection("todos").doc(props.todo.id).delete()}
          />
        </ListItem>
      </List>
    </>
  );
}
