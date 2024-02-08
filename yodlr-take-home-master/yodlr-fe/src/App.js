import './App.css';
import Routes from "./Routes";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a href="/">
          <h1>Yodlr</h1>
        </a>
        <a href="/signup">Signup</a>
        <a href="/admin">Admin</a>
      </header>
      <Routes />
    </div>
  );
}

export default App;
