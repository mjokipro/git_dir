import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NewMemeForm from "./NewMemeForm";

let memeForm;

describe("<NewMemeForm /> basics", () => {
  beforeEach(() => {
    memeForm = render(<NewMemeForm />)
  })
  
  it('renders', () => {
    expect(memeForm).toBeTruthy();
  });
  it('matches snapshot', () => {
    expect(memeForm.asFragment()).toMatchSnapshot();
  });
})


it('updates state with topText input', () => {
  // mount form and mock addMeme
  const mockFn = jest.fn();
  const {getByText} = render(<NewMemeForm addMeme={mockFn} />);

  fireEvent.click(getByText('Generate Meme!'));

  expect(mockFn).toHaveBeenCalled();
});
