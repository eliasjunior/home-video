import { useHistory } from "react-router-dom";
import React from "react";
import "./home.css";

function Home(props) {
  const history = useHistory();
  const { onHandleBaseFolder } = props;
  const goToPage = (path) => {
    onHandleBaseFolder(path);
    history.push(path);
  };
  return (
    <div className="home-content">
      <div
        className="home-content__home-box home-content__home-box--first link-btn"
        onClick={() => goToPage("movies")}
      >
        Movies
      </div>
      <div
        className="home-content__home-box home-content__home-box--second link-btn"
        onClick={() => goToPage("courses")}
      >
        Courses
      </div>
    </div>
  );
}

export default Home;
