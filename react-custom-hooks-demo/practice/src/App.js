import logo from './logo.svg';
import './App.css';
import MoodClicker from './MoodClicker';
import Counter from './Counter';
import ColorPicker from './ColorPicker';
import SignupForm from './SignupForm';

function App() {
  return (
    <div className="App">
      <SignupForm/>
      <ColorPicker/>
      <Counter/>
      <MoodClicker/>
    </div>
  );
}

export default App;
