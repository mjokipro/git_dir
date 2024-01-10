import logo from './logo.svg';
import './App.css';
import Chips from './Chips';
import Soda from './Soda';
import CannedCoffee from './CannedCoffee';
import Home from './Home';
import {BrowserRouter, Route, Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">

    <BrowserRouter>
    <nav>
      <h3><Link to='/cannedcoffee'>Canned Coffee?</Link></h3>
      <h3><Link to='/soda'>Soda?</Link></h3>
      <h3><Link to='/chips'>Chips?</Link></h3>
      <h3><Link to='/'>Back To Home</Link></h3>
    </nav>

    <Route exact path='/cannedcoffee'>
      <CannedCoffee />
    </Route>
    <Route exact path='/soda'>
      <Soda />
    </Route>
    <Route exact path='/chips'>
      <Chips />
    </Route>   
    <Route exact path='/'>
      <Home />
    </Route>

    </BrowserRouter>
    </div>
    
  );
}

export default App;
