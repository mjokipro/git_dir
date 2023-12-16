import React, { Component } from "react";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: this.props.task,
      isEditing: false
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.collectInput = this.collectInput.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  handleRemove(){
    this.props.deleteTodo(this.props.id)
  }
  toggleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }
  handleChange(evt) {
    this.setState({ task: evt.target.value });
  }
  collectInput(evt) {
    evt.preventDefault();
    this.props.updateTodo(this.props.id, this.state.task);
    this.setState({ isEditing: false });
  }
  render() {
    let result;
    if (this.state.isEditing) {
      result = (
        <div>
          <form onSubmit={this.collectInput}>
            <input
              type="text"
              value={this.state.task}
              onChange={this.handleChange}
            />
            <button>Stop Editing</button>
          </form>
        </div>
      );
    } else {
      result = (
        <div>
          <button onClick={this.toggleEdit}>Edit</button>
          <button onClick={this.handleRemove}>X</button>
          <li>{this.props.task}</li>
        </div>
      );
    }
    return result;
  }
}

export default Todo;
