import React from "react";
import { useHistory } from "react-router-dom";
import "./home.css";
import VdMessage from "../common/VdMessage";
import config from "config";
import { useServerStatus } from "components/customHooks";
const { SERVER_URL } = config();

function Home() {
  const history = useHistory();
  const isOnline = useServerStatus();
  const goToPage = (path) => {
    history.push(path);
  };
  if (isOnline) {
    return (
      <div className="home" onClick={() => goToPage("movies")}>
        <div className="img-box">
          <img src={`${SERVER_URL}/public/movies.png`}></img>
        </div>
      </div>
    );
  } else {
    return <VdMessage text="server is unreachable"></VdMessage>;
  }
}

export default Home;
