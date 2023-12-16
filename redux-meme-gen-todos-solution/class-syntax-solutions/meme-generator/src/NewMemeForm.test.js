import React from 'react'; // for JSX
import { shallow, mount } from 'enzyme'; // how to mount the component
import toJson from 'enzyme-to-json';
import NewMemeForm from "./NewMemeForm"; // import the component itself

describe('<MemeForm />', () => {
  let wrapper;
  it('renders', () => {
    wrapper = shallow(<NewMemeForm />);
  });
  it('matches snapshot', () => {
    const serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
  });
  describe('<NewMemeForm />', () => {
    it('updates state with topText input', () => {
      // mount form and mock addMeme
      let wrapper = mount(<NewMemeForm addMeme={jest.fn()} />);

      // assert empty string default
      expect(wrapper.state().topText).toBe('');

      // select form input
      let form_topText = wrapper.find('#form_topText');

      // put 'xyz' as the value into the form input
      form_topText.instance().value = 'xyz';

      // send a "change" event
      form_topText.simulate('change');

      // assert that state has updated
      expect(wrapper.state().topText).toBe('xyz');
    });
  });
});
