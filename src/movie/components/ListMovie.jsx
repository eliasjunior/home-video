import React, { useState, useEffect } from "react";
import "./listMovie.css";
import { getVideos } from "./Presenter";
import Loading from "../../components/Loading";
import VdMessage from "../../components/VdMessage";
import Video from "./Video";

function ListMovie(props) {
  const { serverStatus, history } = props;
  const [loadedFailed, setLoadedFailed] = useState(false);
  const [movies, setMovies] = useState({});
  useEffect(() => {
    async function fecthData() {
      try {
        const { movieMap } = await getVideos();
        setMovies(movieMap);
      } catch (err) {
        setLoadedFailed(!loadedFailed);
      }
    }
    fecthData();
  }, []);

  const setUpMovie = (movieId) => {
    history.push(`/display/${movieId}`);
  };

  const displayContent = () => {
    return (
      <div className="media-content">
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
      <div className="player-detail">{displayContent()}</div>
    );
  }
}

export default ListMovie;
