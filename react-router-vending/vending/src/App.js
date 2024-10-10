
import {BrowserRouter, Route} from "react-router-dom"
import NavBar from "./NavBar";
import Candy from "./Candy";
import Chips from "./Chips";
import Home from "./Home"
import Soda from "./Soda"

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Route exact path="/"><Home/></Route>
      <Route exact path="/candy"><Candy/></Route>
      <Route exact path="/chips"><Chips/></Route>
      <Route exact path="/soda"><Soda/></Route>
    </BrowserRouter>
  );
}

export default App;
