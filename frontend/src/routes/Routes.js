import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import DogList from './DogList';
import FilterDogDetails from './FilterDogDetails';

function Routes({dogs}) {
  return (
    <Routes>
      <Route
        path="/dogs"
        element={<DogList dogs={dogs} />}
      />

      <Route
        path="/dogs/:name"
        element={<FilterDogDetails dogs={dogs} />}
      />

      <Route
        path="/*"
        element={<Navigate to="/dogs" />}
      />
    </Routes>
  );
}

export default Routes;

