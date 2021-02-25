import React, { useState, useEffect } from "react";
import "./movie.css";
import { getVideos } from "./Presenter";
import Loading from "../common/Loading";
import Message from "../common/Message";
import Video from "./Video";

function ListMovie(props) {
  const { serverStatus } = props;
  const [movies, setMovies] = useState({});
  const [currentId, setCurrentId] = useState("");
  const { onHandleVideoPath } = props;
  useEffect(() => {
    async function fecthData() {
      try {
        const { movieMap } = await getVideos();
        setMovies(movieMap);
      } catch (err) {
        console.error(err);
      }
    }
    fecthData();
  }, []);

  const setUpMovie = (movieId) => {
    setCurrentId(movieId);
  };

  const displayContent = () => {
    console.log(movies.byId);
    if (currentId) {
      const movie = movies.byId[currentId];
      return (
        <Video
            video={movie}
            onSetVideo={setUpMovie}
            onHandleSelectedMovie={onHandleVideoPath}
            isDetail={true}
          ></Video>
      );
    } else {
      return (
        <div className="media-content">
          {movies.allIds.map((id) => (
            <Video
              video={movies.byId[id]}
              key={id}
              onSetVideo={setUpMovie}
              onHandleSelectedMovie={onHandleVideoPath}
            ></Video>
          ))}
        </div>
      );
    }
  };
  if (serverStatus === "offline") {
    return <Message text="server is unreachable"></Message>;
  } else {
    return !movies.allIds || movies.allIds.length === 0 ? (
      <Loading></Loading>
    ) : (
      <div className="player-detail">{displayContent()}</div>
    );
  }
}

export default ListMovie;
