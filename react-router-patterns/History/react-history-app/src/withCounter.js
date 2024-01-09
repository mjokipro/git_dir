import React from "react";

const withCounter = Component => {
  return class extends React.Component {
    state = {
      count: 0
    };

    handleDecrement = () => {
      this.setState({count: this.state.count - 1});
    };

    handleIncrement = () => {
      this.setState({count: this.state.count + 1});
    };

    render() {
      return (
        <Component
          {...this.props}
          count={this.state.count}
          onIncrease={this.handleIncrement}
          onDecrease={this.handleDecrement}
        />
      );
    }
  };
};

export default withCounter;
