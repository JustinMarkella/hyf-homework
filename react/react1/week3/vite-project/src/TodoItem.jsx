import React from "react";
import PropTypes from "prop-types";

function TodoItem({ item, DeleteTodoItem, CrossOutItem, EditTodoItem }) {
  return (
    <li
      className={item.crossOut ? "notCrossedOut" : "crossedOut"}
      key={item.id}
    >
      {item.description} | {item.deadline}
      <input type="checkbox" onChange={() => CrossOutItem(item)} />
      <button onClick={(e) => EditTodoItem(item.id, e)}>Edit</button>
      <button onClick={() => DeleteTodoItem(item.id)}>Delete</button>
    </li>
  );
}

TodoItem.propTypes = {
  item: PropTypes.object.isRequired,
  DeleteTodoItem: PropTypes.func.isRequired,
  CrossOutItem: PropTypes.func.isRequired,
  EditTodoItem: PropTypes.func.isRequired,
};

export default TodoItem;
