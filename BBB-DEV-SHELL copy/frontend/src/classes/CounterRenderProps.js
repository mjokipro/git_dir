import React from "react";

class Wrapper extends React.Component {
  state = { count: 0 };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  render() {
    return (
      <div>
        {this.props.render({
          increment: this.increment,
          decrement: this.decrement,
          count: this.state.count
        })}
      </div>
    );
  }
}

class CounterRenderProps extends React.Component {
  render() {
    return (
      <Wrapper
        render={obj => (
          <div>
            <div>Current count: {obj.count}</div>
            <div>
              <button onClick={obj.decrement}>
                -
              </button>
              <button onClick={obj.increment}>
                +
              </button>
            </div>
          </div>
        )}
      />
    );
  }
}

export default CounterRenderProps;
