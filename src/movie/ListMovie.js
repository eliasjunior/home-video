import React, { useState, useEffect } from "react";
import "./movie.css";
import Footer from "../footer/Footer";
import { getVideos } from "./Presenter";
import Loading from "../common/Loading";
import MovieDetail from "./MovieDetail";

function ListMovie(props) {
  const { baseFolder, match } = props;
  const [movies, setMovies] = useState({});
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    async function fecthData() {
      const { movieMap } = await getVideos({ urlResource: match.url.slice(1) });
      console.log("movieMap >>", movieMap);
      setMovies(movieMap);
    }
    fecthData();
  }, []);

  const setUpMovie = (movieId) => {
    console.log("current*", movieId);
    setCurrentId(movieId);
  };

  const displayContent = () => {
      if(currentId) {
        const { onHandleVideoPath } = props;
        const movie = movies.byId[currentId];
        return <MovieDetail movie={movie} 
                baseFolder={baseFolder} 
                onHandleVideoPath={onHandleVideoPath}>
            </MovieDetail>
      } else {
        return  <ul>
            {movies.allIds.map((id) => (
                <li key={id}>
                <button 
                    className="link-base link-btn" 
                    onClick={() => setUpMovie(id)}
                    >
                    {id}
                </button>
          </li>
        ))}
      </ul>    
      }
  }
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
