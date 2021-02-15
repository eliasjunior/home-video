import { Link } from "react-router-dom";
import React from 'react';
import "./home.css";

function Home(props) {
    const { onHandleBaseFolder } = props;
    return (
      <div className="home-content">
        <div className="home-content__home-box home-content__home-box--first">
          <Link
            className="link-base"
            onClick={() => onHandleBaseFolder("movies")}
            to={"/movies"}
          >
            Movies
          </Link>
        </div>
        <div className="home-content__home-box home-content__home-box--second">
          <Link
            className="link-base"
            onClick={() => onHandleBaseFolder("courses")}
            to={"/courses"}
          >
            Courses
          </Link>
        </div>
      </div>
    );
}

export default Home;




