import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Todo from './Todo';

it('renders shallowly without crashing', function () {
  shallow(<Todo />);
});

it('passes snapshot test', function () {
  let wrapper = shallow(<Todo />);
  let serialized = toJSON(wrapper);
  expect(serialized).toMatchSnapshot();
});

it('does not show the form by default and toggles on click', function () {
  let wrapper = shallow(<Todo task="do not render form" />);
  expect(wrapper.find("form")).toHaveLength(0);

  let btn = wrapper.find('button').first();
  btn.simulate('click');

  expect(wrapper.find("form")).toHaveLength(1);

  btn.simulate("click");

  expect(wrapper.find("form")).toHaveLength(0);
});