import React from "react";
import { Link } from 'react-router-dom';


const Nav = () => {
    return(
        <nav>
            <a href='#App-header' >Home</a>
            <a href='#about'>About</a> 
            <a href='#get-started'>Get Started</a>
            <a href='#footer'>Code </a>
            {/* <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
            <Link to='/get-started'>Get Started</Link>
            <Link to='/code'>Code</Link> */}
        </nav>
    )
}
export default Nav