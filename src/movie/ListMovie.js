import React, { useState, useEffect } from "react";
import "./movie.css";
import Footer from "../footer/Footer";
import { getVideos, getMovieImg } from "./Presenter";
import Loading from "../common/Loading";
import MovieDetail from "./MovieDetail";

function ListMovie(props) {
  const { baseFolder, match } = props;
  const [movies, setMovies] = useState({});
  const [currentId, setCurrentId] = useState("");

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

  const getImg = (id) => {
    const movie = movies.byId[id];
    return getMovieImg(movie);
  };

  const displayContent = () => {
    if (currentId) {
      const { onHandleVideoPath } = props;
      const movie = movies.byId[currentId];
      return (
        <MovieDetail
          movie={movie}
          baseFolder={baseFolder}
          onHandleVideoPath={onHandleVideoPath}
        ></MovieDetail>
      );
    } else {
      return (
        <div className="media-content">
          {movies.allIds.map((id) => (
            <div
              className="media-content__box "
              key={id}
              onClick={() => setUpMovie(id)}
            >
              <div className="media-content__box--img-box">
                <img
                  className="media-content__box--img"
                  key={id}
                  src={getImg(id)}
                ></img>
                <div className="media-content__box--text">{id}</div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };
  return !movies.allIds ? (
    <Loading></Loading>
  ) : (
    <div>
      {displayContent()}
      <Footer></Footer>
    </div>
  );
}

export default ListMovie;
