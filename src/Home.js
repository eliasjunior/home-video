import { Link } from "react-router-dom";
import React from 'react';

function Home(props) {
    const { onHandleBaseFolder } = props;
    return <div className="home-content">
        <div>
            <Link 
                className="link-base" 
                onClick={() => onHandleBaseFolder('movies')}
                to={'/movies'}>
                Movies
            </Link>
        </div>
        <div>
            <Link 
                className="link-base" 
                onClick={() => onHandleBaseFolder('courses')}
                to={'/courses'}>
                Courses
            </Link>
        </div>
    </div>
}

export default Home;




