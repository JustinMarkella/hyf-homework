import React from "react";
import { ToDoList, toDo } from "./ToDoList.jsx";

export function Header() {
  return (
    <div>
      <h1>Homework React1 Week1 </h1>
      <ToDoList toDo={toDo}></ToDoList>
    </div>
  );
}
