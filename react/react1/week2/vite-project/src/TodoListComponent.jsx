import React, { useState } from "react";
import TodoItem from "./TodoItem";

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
          {todo.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              deleteItem={DeleteTodoItem}
              crossOutItem={CrossOutItem}
            />
          ))}
        </ul>
      ) : (
        <p>Todo list is empty</p>
      )}
    </>
  );
}

export default TodoList;
