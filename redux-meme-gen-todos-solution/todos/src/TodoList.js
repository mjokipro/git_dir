import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector(st => st.todos);

  function handleCreate(task) {
    dispatch({
      type: "ADD_TODO",
      task
    });
  }

  function handleUpdate(id, updatedTask) {
    dispatch({
      type: "UPDATE_TODO",
      id,
      updatedTask 
    });
  }
  
  function handleDelete(id) {
    dispatch({ type: "REMOVE_TODO", id });
  }

  const todosJSX = todos.map(todo => (
    <Todo
      deleteTodo={handleDelete}
      id={todo.id}
      key={todo.id}
      task={todo.task}
      updateTodo={handleUpdate}
    />
  ));
  return (
    <div>
      <NewTodoForm createTodo={handleCreate} />
      <ul>{todosJSX}</ul>
    </div>
  );
}

export default TodoList;