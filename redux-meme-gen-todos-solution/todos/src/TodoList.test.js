import React from "react";
import { render } from "@testing-library/react";
import TodoList from "./TodoList";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';

const store = createStore(reducer);

it("renders without crashing", function() {
  render(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
});