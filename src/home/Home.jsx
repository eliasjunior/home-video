import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import "./home.css";
import config from "../config";
const { SERVER_URL } = config();

function Home({ onHandleBaseFolder }) {
  const history = useHistory();
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

Home.propTypes = {
  onHandleBaseFolder: PropTypes.func,
};