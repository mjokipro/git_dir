import React from "react";
import Navbar from "./Navbar";
import Routes from "./Routes";

/** Main application. */

function App() {
  return (
    <main>
      <Navbar />
      <div className="container">
        <h1 className="mt-3">Welcome to the shopping cart!</h1>
        <Routes />
      </div>
    </main>
  );
}

export default App;
