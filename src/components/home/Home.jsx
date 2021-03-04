import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./home.css";
import VdMessage from "../common/VdMessage";
import config from "../../config";
const { SERVER_URL } = config();

function Home() {
  const history = useHistory();
  const [errorServer, setErrorServer] = useState(false);
  const goToPage = (path) => {
    history.push(path);
  };
  if (errorServer) {
    return <VdMessage text="server is unreachable"></VdMessage>;
  }
  return (
    <div className="home" onClick={() => goToPage("movies")}>
      <img
        src={`${SERVER_URL}/public/movies.png`}
        onError={() => setErrorServer(!errorServer)}
      ></img>
    </div>
  );
}

export default Home;