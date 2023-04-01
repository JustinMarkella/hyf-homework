import React from "react";

function ToDoListItem(props) {
  return (
    <li>
      {props.listStyle}
      {props.task},{props.date}
      {props.description}
    </li>
  );
}

export function ToDoList(props) {
  return (
    <ul>
      {props.toDo.map((todo) => {
        return (
          <ToDoListItem
            key={todo.id}
            listStyle={todo.listStyle}
            task={todo.task}
            date={todo.date}
            description={todo.description}
          />
        );
      })}
    </ul>
  );
}

export const toDo = [
  {
    id: 0,
    listStyle: "* ",
    task: "Get out of bed",
    date: " Wed Sep 13 2017 ",
    description: "(Move your a** out of the bed)",
  },
  {
    id: 1,
    listStyle: "* ",
    task: "Brush teeth",
    date: " Thu Sep 14 2017 ",
    description: "(Atleast 2 min.)",
  },
  {
    id: 2,
    listStyle: "* ",
    task: "Eat breakfast",
    date: " Fri Sep 15 2017 ",
    description: "(Eat some flakes, fruits, and drink some tea)",
  },
];
