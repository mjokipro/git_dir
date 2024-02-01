import React from "react";

class CounterClassBasedInlineArrow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        <div>Current count: {count}</div>
        <div>
          <button onClick={() => this.setState({ count: count - 1 })}>
            -
          </button>
          <button onClick={() => this.setState({ count: count + 1 })}>
            +
          </button>
        </div>
      </div>
    );
  }
}

export default CounterClassBasedInlineArrow;
