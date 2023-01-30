import React from "react";
import Nav from "./components/Nav";


const App = () => {
  return (
    <div className="App">
      <header className="App-header">
          <h1>Climate Comparer</h1>
          <p>An easy way to compare climate data between cities around the world!</p>
      </header>
    <Nav/>

      <footer className="App-footer">
          <p>© 2023 Ryan Clark</p>
      </footer>
    </div>
  );
}

export default App;
