import React from "react"
import { useHistory } from 'react-router-dom';


const Home = () => {
    return (
    <>
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
  </>
);
}

export default Home;