import React, { useState } from "react";

import Home from "./Home";
import Eat from "./Eat";
import Drink from "./Drink";

function App() {
  const [page, setPage] = useState("home");

  function goToPage(newPage) {
    setPage(newPage);
  }

  function showPage() {
    if (page === "home") return <Home />;
    if (page === "eat") return <Eat />;
    if (page === "drink") return <Drink />;
  }

  return (
    <main>
      <nav>
        <a onClick={() => goToPage("drink")}>Drink</a>
        <a onClick={() => goToPage("eat")}>Eat</a>
        <a onClick={() => goToPage("home")}>Home</a>
      </nav>
      {showPage()}
    </main>
  );
}
// end

export default App;
