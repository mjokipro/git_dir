import './App.css';
import ShoppingCart from './ShoppingCart';
import items from './items'
import moreItems from './moreItems'
import fakelogo from './logo.svg'
import Alert from './Alert';

function App() {

  return (
    <div>
      <Alert variant="success">
        <h1>hello</h1>
      </Alert>
      <Alert variant="danger">
        <h1>uh oh</h1>
      </Alert>
      <ShoppingCart items={items} username='yodog' />
      <ShoppingCart items={moreItems} username='yodog2' />
      <img src={fakelogo} alt="" id="logo" />
    </div>
  );
}

export default App;
