import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import TodoList from "./TodoList";

it("renders shallowly without crashing", function() {
  shallow(<TodoList />);
});

it("passes snapshot test", function() {
  let wrapper = shallow(<TodoList />);
  let serialized = toJSON(wrapper);
  expect(serialized).toMatchSnapshot();
});
