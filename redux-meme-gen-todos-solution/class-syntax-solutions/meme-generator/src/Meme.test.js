import React from 'react'; // for JSX
import { shallow, mount } from 'enzyme'; // how to mount the component
import toJson from 'enzyme-to-json';
import Meme from './Meme'; // import the component itself

describe('<Meme />', () => {
  let wrapper;
  it('renders', () => {
    wrapper = shallow(
      <Meme
        url="https://i.ytimg.com/vi/I7jgu-8scIA/maxresdefault.jpg"
        topText="I can haz"
        bottomText="react tests"
      />
    );
  });
  it('matches snapshot', () => {
    const serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
  });
  describe('<Meme />', () => {
    it('applies url prop to image src', () => {
      let wrapper = mount(
        <Meme
          url="https://i.ytimg.com/vi/I7jgu-8scIA/maxresdefault.jpg"
          topText="I can haz"
          bottomText="react tests"
        />
      );
      let img = wrapper.find('img'); // select the img tag

      // assert that we are passing src to the img
      expect(img.prop('src')).toBe(
        'https://i.ytimg.com/vi/I7jgu-8scIA/maxresdefault.jpg'
      );
    });
  });
});
