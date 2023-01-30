import React, { useEffect } from "react";
import Nav from "./components/Nav";
import Map from "./components/Map";
//import '../style/componentStyle/Map.css'



const App = () => {
  
  return (
    <div className="App">
      <header className="App-header">
          <h1>Climate Comparer</h1>
          <p>An easy way to compare climate data between cities around the world!</p>
      </header>

    <Nav/>

    <section id='about'>
      <h3>About</h3>
      <p>Random Latin filler words...</p>
    </section>

    <section id='get-started'>
      <h3>Get Started!</h3>
      <p>Random Latin filler words....</p>

      <div className="column" id="left-column">   
          <div id ='map'>****Map Goes Here****</div>
      </div>

      <p>Select a city and country and get started!</p>
      <select>
        <option>City</option>
      </select>
      <select>
        <option>Country</option>
      </select>
      <button>Go</button>

    </section>


      <footer className="footer">
          <h4>Footer</h4>
          <p>© 2023 Ryan Clark</p>
          <a href='https://github.com/rclarkperez/ClimateComparer'>Github</a>
      </footer>
    </div>
  );
}

export default App;
