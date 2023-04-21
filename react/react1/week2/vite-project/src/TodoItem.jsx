import React from "react";

function TodoItem(props) {
  const { item, deleteItem, crossOutItem } = props;

  return (
    <li
      className={item.crossOut ? "notCrossedOut" : "crossedOut"}
      key={item.id}
    >
      {item.description}
      <input type="checkbox" onChange={() => crossOutItem(item)} />
      <button onClick={() => deleteItem(item.id)}>Delete</button>
    </li>
  );
}

export default TodoItem;
