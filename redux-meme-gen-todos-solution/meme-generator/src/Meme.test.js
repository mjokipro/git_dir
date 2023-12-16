import React from 'react';
import { render } from '@testing-library/react';
import Meme from './Meme';

let meme;
beforeEach(() => {
  meme = render(
    <Meme
      url="https://i.ytimg.com/vi/I7jgu-8scIA/maxresdefault.jpg"
      topText="I can haz"
      bottomText="react tests"
    />
  );
})
it('renders', () => {
  expect(meme).not.toBeNull();
});
it('matches snapshot', () => {
  expect(meme.asFragment()).toMatchSnapshot();
});
it('applies url prop to image src', () => {
  const img = meme.getByAltText('a meme');
  
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute(
    'src',
    'https://i.ytimg.com/vi/I7jgu-8scIA/maxresdefault.jpg'
  );
});
