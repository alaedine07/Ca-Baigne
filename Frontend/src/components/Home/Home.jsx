import React from "react";
import { Link } from "react-router-dom";

export function Home() {
    return (
        <div id="Home">
            <h2> Hello Home page </h2>
            <Link to="login"> Click here to login </Link>
            <Link to="join"> Click here to join   </Link>
        </div>
    )
}

export default Home
