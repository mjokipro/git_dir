import React from 'react';
import Todo from './Todo';
import {render, fireEvent} from '@testing-library/react';

it('renders without crashing', function () {
  render(<Todo />);
});

it('passes snapshot test', function () {
  expect(
    render(<Todo task="to do" />).asFragment()
  ).toMatchSnapshot();
});

it('does not show the form by default and toggles on click', function () {
  const {
    queryByDisplayValue,
    getByText,
    getByDisplayValue
  } = render(<Todo task="editing task" updateTodo={() => undefined} />);

  expect(queryByDisplayValue("editing task")).not.toBeInTheDocument();

  const editButton = getByText("Edit");
  expect(editButton).toBeInTheDocument();

  fireEvent.click(editButton);

  expect(getByDisplayValue("editing task")).toBeInTheDocument();

  fireEvent.click(getByText("Stop Editing"));
});