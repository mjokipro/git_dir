import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "./rootReducer";

const store = createStore(rootReducer);

test('renders learn react link', () => {
  const { getByText } = render(<Provider store={store}><App /></Provider>);
  const linkElement = getByText(/Make a New Meme/i);
  expect(linkElement).toBeInTheDocument();
});
