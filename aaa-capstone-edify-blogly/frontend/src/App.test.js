import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', function() {
  const { getByText } = render(<App />);

});
