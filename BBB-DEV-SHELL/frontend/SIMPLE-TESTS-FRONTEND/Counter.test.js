import { render, screen } from '@testing-library/react';
import App from './App';
import Counter from './Counter';

test('it renders w/out crashing', () => {
  render(<Counter /> )
})

test('playing with queries', () => {
  const {getByText, debug} = render(<Counter />)
  debug()
  console.log(getByText(`Let's count`, {exact: false}))
})
test('playing with queries 2', () => {
  const {getAllByText, getByText, queryByText, queryAllByText, getByPlaceholderText,
    getByLabelText} = render(<Counter />)
    
  console.log(getAllByText(`count`, {exact: false}))
  // console.log(getByText('Cake'))
  console.log(queryByText('Cake'))
  console.log(queryAllByText('count', {exact: false}))
  console.log(getByPlaceholderText('username'))
  console.log(getByLabelText('Username'))
})