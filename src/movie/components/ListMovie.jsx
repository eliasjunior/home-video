import React, { useState, useEffect } from "react";
import "./movie.css";
import { getVideos } from "./Presenter";
import Loading from "../../components/Loading";
import VdMessage from "../../components/VdMessage";
import Video from "./Video";

function ListMovie(props) {
  const { serverStatus } = props;
  const [loadedFailed, setLoadedFailed] = useState(false);
  const [movies, setMovies] = useState({});
  const [currentId, setCurrentId] = useState("");
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
    setCurrentId(movieId);
  };

  const displayContent = () => {
    if (currentId) {
      const movie = movies.byId[currentId];
      return (
        <Video video={movie} onSetVideo={setUpMovie} isDetail={true}></Video>
      );
    } else {
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
    }
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
