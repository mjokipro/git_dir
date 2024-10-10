import React, { Component } from "react";
import Counter from "./Counter";
import { Provider } from "react-redux";
import rootReducer from "./rootReducer";
import { createStore } from "redux";

const store = createStore(rootReducer);
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Counter />
        </div>
      </Provider>
    );
  }
}

export default App;
