import React, { useReducer } from "react";
import NewMemeForm from "./NewMemeForm";
import MemeList from "./MemeList";
import rootReducer from "./rootReducer";
import DispatchContext from "./dispatchContext";
import MemeContext from "./memeContext";
import "./App.css";

function App() {
  const [state, dispatch] = useReducer(
    rootReducer,
    { memes: [] }
  );

  return (
    <div className="App">
      <DispatchContext.Provider value={dispatch}>
        <MemeContext.Provider value={state.memes}>
          <NewMemeForm />
          <MemeList />
        </MemeContext.Provider>
      </DispatchContext.Provider>
    </div>
  );
}

export default App;
