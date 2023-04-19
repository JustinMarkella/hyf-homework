import React, { useState, useEffect } from "react";

function TodoList() {
  const [todo, setTodo] = useState([
    {
      id: 0,
      description: "Get out of bed",
      crossOut: "false",
    },
    {
      id: 1,
      description: "Brush teeth",
      crossOut: "false",
    },
    {
      id: 2,
      description: "Eat breakfast",
      crossOut: "false",
    },
  ]);
  const [todoId, setTodoId] = useState(3);

  function DeleteTodoItem(id) {
    const updatedTodoList = todo.filter((item) => item.id !== id);
    setTodo(updatedTodoList);
  }

  function CrossOutItem(item) {
    const updatedTodo = todo.map((todoItem) => {
      if (todoItem.id === item.id) {
        return { ...todoItem, crossOut: !todoItem.crossOut };
      } else {
        return todoItem;
      }
    });
    setTodo(updatedTodo);
  }

  async function AddTodoItem() {
    // add random todo from API
    const jsonTodo = await fetch("https://dummyjson.com/todos/random").then(
      (res) => res.json().catch(console.error())
    );
    const fetchedTodo = jsonTodo.todo;
    // add latest ID
    setTodoId(todoId + 1);
    const newTodo = { id: todoId, description: fetchedTodo, crossOut: "false" };
    setTodo([...todo, newTodo]);
  }
  return (
    <>
      <button onClick={AddTodoItem}>Create Random Todo</button>
      {todo.length > 0 ? (
        <ul>
          {todo.map((item) => {
            return (
              <li
                className={item.crossOut ? "notCrossedOut" : "crossedOut"}
                key={item.id}
              >
                {item.description}
                <input type="checkbox" onChange={() => CrossOutItem(item)} />
                <button onClick={() => DeleteTodoItem(item.id)}>Delete</button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Todo list is empty</p>
      )}
    </>
  );
}

export default TodoList;
