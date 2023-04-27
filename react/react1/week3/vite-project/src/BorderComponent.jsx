import React from "react";
import LifeCycleComponent from "./LifeCycleComponent";
import TodoItem from "./TodoItem";

const BorderComponent = ({
  item,
  EditTodoItem,
  DeleteTodoItem,
  CrossOutItem,
}) => {
  return (
    <div className="border">
      {/* <LifeCycleComponent /> */}
      <TodoItem
        key={item.id}
        item={item}
        EditTodoItem={EditTodoItem}
        DeleteTodoItem={DeleteTodoItem}
        CrossOutItem={CrossOutItem}
      />
    </div>
  );
};

export default BorderComponent;
