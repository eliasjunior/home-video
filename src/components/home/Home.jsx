import React from "react";
import { useHistory } from "react-router-dom";
import "./home.css";
import config from "config";
const { SERVER_URL } = config();

function Home() {
  const history = useHistory();
  const goToPage = (path) => {
    history.push(path);
  };
  return (
    <div className="home" onClick={() => goToPage("movies")}>
      <div className="img-box">
        <img src={`${SERVER_URL}/public/movies.png`}></img>
      </div>
    </div>
  );
}

export default Home;
