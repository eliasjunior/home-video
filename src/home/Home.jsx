import { useHistory } from "react-router-dom";
import React from "react";
import "./home.css";
import config from "../config";
const { SERVER_URL } = config();

function Home(props) {
  const history = useHistory();
  const { onHandleBaseFolder } = props;
  const goToPage = (path) => {
    onHandleBaseFolder(path);
    history.push(path);
  };
  return (
    <div className="home" onClick={() => goToPage("movies")}>
      <img src={`${SERVER_URL}/public/movies.png`}></img>
    </div>
  );
}

export default Home;
