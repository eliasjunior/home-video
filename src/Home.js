import { Link } from "react-router-dom";
import React from 'react';

function Home() {
    return <div>
        <div>
            <Link to={'/movies'}>Movies</Link>
        </div>
        <div>
            <Link to={'/courses'}>Courses</Link>
        </div>
    </div>
}

export default Home;