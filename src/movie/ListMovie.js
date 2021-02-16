import React, { useState, useEffect } from "react";
import "./movie.css";
import Footer from "../footer/Footer";
import { getVideos } from "./Presenter";
import Loading from "../common/Loading";
import MovieDetail from "./MovieDetail";
import { getFallBackImgPath } from "../common/Util";

function ListMovie(props) {
  const { baseFolder, match } = props;
  const [movies, setMovies] = useState({});
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    async function fecthData() {
      const { movieMap } = await getVideos({ urlResource: match.url.slice(1) });
      setMovies(movieMap);
    }
    fecthData();
  }, []);

  const setUpMovie = (movieId) => {
    setCurrentId(movieId);
  };

  const getImgPath = (id) => {
    const movie = movies.byId[id];
    return getFallBackImgPath(movie.img);
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
            <div className="media-content__box " key={id}  onClick={() => setUpMovie(id)}>
                <div className="media-content__box--img-box">
                  <img
                    className="media-content__box--img"
                    key={id}
                    src={getImgPath(id)}
                  ></img>
                  {/* <div className="media-content__box--text">{id}</div> */}
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
