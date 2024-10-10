import { render } from '@testing-library/react';
import TagList from "./TagList"
import SearchForm from '../common/SearchForm'
import JoblyApi from '../api/api'


test('Renders w/o crashing', function() {
 const {asFragment} = render(<TagList />)
expect(asFragment()).toMatchSnapshot()
});
