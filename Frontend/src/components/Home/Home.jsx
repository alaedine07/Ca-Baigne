import React from "react";

import SearchBox from "../SearchBox/SearchBox";

import './Home.css'

export function Home() {
    return (
        <div className="container">
            {/* <Link to="login"> Click here to login </Link>
            <Link to="join"> Click here to join   </Link> */}
            <SearchBox />
        </div>
    )
}

export default Home
