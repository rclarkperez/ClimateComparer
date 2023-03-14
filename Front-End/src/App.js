import React from "react";

//Import Components
import Nav from "./components/Nav";
// import Map from "./components/Map";

//Import Pages
import Add from "./pages/Add";
import Home from "./pages/Home";

import { BrowserRouter, Route, Routes } from "react-router-dom";
//import '../style/componentStyle/Map.css'




const App = () => {
  
  return (
    <div className="App">
      <header className="App-header">
          <h1>Climate Comparer</h1>
          <p>An easy way to compare climate data between cities around the world!</p>
      </header>

    <Nav/>

    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path='/'  element={<Home/>}/>
          <Route exact path='/add'  element={<Add/>}/>
        </Routes>
      </div>
    </BrowserRouter>


      <footer className="footer">
          <h4>Footer</h4>
          <p>© 2023 Ryan Clark</p>
          <a href='https://github.com/rclarkperez/ClimateComparer'>Github</a>
      </footer>
    </div>
  );
}

export default App;
