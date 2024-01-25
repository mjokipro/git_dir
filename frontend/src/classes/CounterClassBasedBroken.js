import React from "react";

class CounterClassBasedBroken extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <div>Current count: {this.state.count}</div>
        <div>
          <button onClick={this.decrement}>-</button>
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    );
  }
}

export default CounterClassBasedBroken;
