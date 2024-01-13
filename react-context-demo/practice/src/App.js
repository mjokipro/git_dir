import React from "react";
// import CounterReadOnly from "./CounterReadOnly";
// import CounterReadWrite from "./CounterReadWrite";
import Child from "./Child";
import Navbar from "./Navbar";
import ThemeProvider from "./ThemeProvider";

function App() {
//   const [themeColor, setThemeColor] = useState("yellow")

// const toggleTheme = () => {
//   setThemeColor(color => color === 'yellow' ? 'blue' : 'yellow')
// }

  return (
    <div style={{border: '4px solid'}}>
      <ThemeProvider>
        <Navbar />
        <Child />
      </ThemeProvider>
    </div>
  );
}

export default App;
