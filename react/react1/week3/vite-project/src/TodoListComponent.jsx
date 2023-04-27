import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import UserInput from "./UserInput";
import DatePicker, { registerLocale } from "react-datepicker";
import da from "date-fns/locale/da";
registerLocale("da", da);
import moment from "moment";
import EditComponent from "./EditComponent";
import BorderComponent from "./BorderComponent";
import "react-datepicker/dist/react-datepicker.css";

function TodoList() {
  const [todo, setTodo] = useState([]);
  const [todoId, setTodoId] = useState(4);
  const [value, setValue] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const formattedDate = moment(startDate).format("YYYY-MM-DD");
  const [editedId, setEditedId] = useState(-1);
  const [updatedValue, setUpdatedValue] = useState(" ");

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/benna100/391eee7a119b50bd2c5960ab51622532/raw"
    )
      .then((res) => res.json())
      .then((data) => data.map((item) => ({ ...item, crossOut: "false" })))
      .then((data) => setTodo(data))
      .catch(console.error());
  }, []);

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

  function EditTodoItem(id) {
    const itemToUpdate = todo.find((item) => item.id === id);
    if (itemToUpdate) {
      setUpdatedValue(itemToUpdate.description);
      setEditedId(id);
    }
  }

  function HandleUpdate(editedId) {
    const updatedTodo = todo.map((item) => {
      if (item.id === editedId) {
        return { ...item, description: updatedValue };
      }
      return item;
    });
    setTodo(updatedTodo);
    setEditedId(-1);
  }

  async function AddTodoItem() {
    const descriptionFromInput = value;
    setTodoId(todoId + 1);
    if (value.trim() !== "") {
      const newTodo = {
        id: todoId,
        description: descriptionFromInput,
        deadline: formattedDate,
        crossOut: "false",
      };
      setTodo([...todo, newTodo]);
      setValue("");
    } else {
      alert("Enter description first!");
    }
  }
  return (
    <>
      <UserInput value={value} setValue={setValue} />
      <button onClick={AddTodoItem}>Create Todo</button>
      {todo && todo.length > 0 ? (
        <ul>
          <DatePicker
            locale="da"
            dateFormat="dd/MM/yyyy"
            selected={new Date(startDate)}
            minDate={new Date(startDate)}
            onChange={(date) => setStartDate(date)}
          />
          {todo.map((item) =>
            item.id === editedId ? (
              <EditComponent
                key={item.id}
                editedId={editedId}
                handleUpdate={HandleUpdate}
                updatedValue={updatedValue}
                setUpdatedValue={setUpdatedValue}
              />
            ) : (
              <BorderComponent
                key={item.id}
                item={item}
                EditTodoItem={EditTodoItem}
                DeleteTodoItem={DeleteTodoItem}
                CrossOutItem={CrossOutItem}
              />
            )
          )}
        </ul>
      ) : (
        <p>Todo list is empty</p>
      )}
    </>
  );
}

export default TodoList;
