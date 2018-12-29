import { Link } from "react-router-dom";
import React from 'react';

function Home() {
    return <div className="home-content">
        <div>
            <Link className="link-base link-btn" to={'/movies'}>Movies</Link>
        </div>
        <div>
            <Link className="link-base link-btn" to={'/courses'}>Courses</Link>
        </div>
    </div>
}

export default Home;