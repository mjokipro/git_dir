import React from 'react';
import Nav from './Nav';
import {render} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// basic tests
it('renders without crashing', function() {
  render(
    <MemoryRouter>
      <Nav />
    </MemoryRouter>
  );
});

it('matches snapshot', function() {
  const container = render(
    <MemoryRouter>
      <Nav />
    </MemoryRouter>
  );
  expect(container.asFragment()).toMatchSnapshot();
});
// end basic tests

// full render
it('mounts without crashing', function() {
  const { getByText } = render(
    <MemoryRouter>
      <Nav />
    </MemoryRouter>
  );

  const blogLink = getByText(/Blog/i);
  expect(blogLink).toBeInTheDocument();
});
