import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { Input, InputLabel } from "@material-ui/core";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";
import "./App.css";
function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  //when the app loads we need to listen to the database and fetch new todos  as they get added/removed

  useEffect(() => {
    //this code fires when app loads
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        //whenever database changes we get a instance of db
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        ); //here we set our todos as the data fetched from db
      });
  }, []);

  const addTodo = (event) => {
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
    event.preventDefault(); //clear up input
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>My ToDo App</h1>
      <FormControl>
        <div style={{ display: "flex" }}>
          <InputLabel>What's Next</InputLabel>
          <Input
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={!input}
            type="submit"
            onClick={addTodo}
          >
            {" "}
            add
          </Button>
        </div>
      </FormControl>

      {todos.map((todo) => (
        <Todo todo={todo} />
      ))}
    </div>
  );
}

export default App;
