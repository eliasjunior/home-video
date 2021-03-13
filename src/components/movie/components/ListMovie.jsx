import React, { useState, useEffect } from "react";
import "./listMovie.css";
import { getVideos } from "./Presenter";
import Loading from "../../common/Loading";
import VdMessage from "../../common/VdMessage";
import Video from "./Video";
import Footer from "components/footer/Footer";

function ListMovie(props) {
  const { serverStatus, history } = props;
  const [loadedFailed, setLoadedFailed] = useState(false);
  const [movies, setMovies] = useState({});
  async function fetchData() {
    try {
      const { movieMap } = await getVideos();
      setMovies(movieMap);
    } catch (err) {
      setLoadedFailed(!loadedFailed);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const setUpMovie = (movieId) => {
    history.push(`/display/${movieId}`);
  };

  const displayContent = () => {
    return (
      <div className="list-content">
        {movies.allIds.map((id) => (
          <Video
            video={movies.byId[id]}
            key={id}
            onSetVideo={setUpMovie}
          ></Video>
        ))}
      </div>
    );
  };
  if (serverStatus === "offline") {
    return <VdMessage text="server is unreachable"></VdMessage>;
  } else {
    return !movies.allIds || movies.allIds.length === 0 ? (
      <Loading></Loading>
    ) : (
      <div className="player-list">
        {displayContent()}
        <Footer></Footer>
      </div>
    );
  }
}

export default ListMovie;
