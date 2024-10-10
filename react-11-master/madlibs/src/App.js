import logo from './logo.svg';
import './App.css';
import SignupForm from './SignupForm';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Please provide an adjective, verb, noun, and adverb to generate a fun story!
              </p>
       
              <SignupForm/>
              
      </header>
    </div>
  );
}

export default App;
