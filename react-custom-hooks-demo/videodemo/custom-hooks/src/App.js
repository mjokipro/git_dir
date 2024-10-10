import React from 'react';
import MoodClicker from './MoodClicker';
import ColorPicker from './ColorPicker';
import Counter from "./Counter"
import SignupForm from './SignupForm'
import DogDetail from "./DogDetail";
import './App.css';

function App() {
  return (
    <div className="App">
      <DogDetail />
      <SignupForm />
      <ColorPicker />
      <Counter />
      <MoodClicker />
    </div>
  );
}

export default App;
