import React, { Component } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";
import { connect } from "react-redux";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleCreate(newTodo) {
    this.props.dispatch({
      type: "ADD_TODO",
      task: newTodo.task
    });
  }

  handleUpdate(id, updatedTask) {
    this.props.dispatch({ type: "UPDATE_TODO", id, updatedTask });
  }
  handleDelete(id) {
    this.props.dispatch({ type: "REMOVE_TODO", id });
  }
  render() {
    const todos = this.props.todos.map(todo => {
      return (
        <Todo
          deleteTodo={this.handleDelete}
          id={todo.id}
          key={todo.id}
          task={todo.task}
          updateTodo={this.handleUpdate}
        />
      );
    });
    return (
      <div>
        <NewTodoForm createTodo={this.handleCreate} />
        <ul>{todos}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  };
}

const connectComponentToRedux = connect(mapStateToProps);

export default connectComponentToRedux(TodoList);
