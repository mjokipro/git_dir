import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import rootReducer from "./rootReducer";
import { createStore } from "redux";
import NumberInputs from "./NumberInputs";
import Math from "./Math";
import MathLessRendering from "./MathLessRendering";
import MathLessRenderingAlt from "./MathLessRenderingAlt";

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <NumberInputs />
      <Math />
      <MathLessRendering />
      <MathLessRenderingAlt />
    </Provider>
  );
}

export default App;
