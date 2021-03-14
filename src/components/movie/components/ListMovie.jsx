import React, { useState, useEffect } from "react";
import "./listMovie.css";
import { getVideos } from "./Presenter";
import Loading from "../../common/Loading";
import VdMessage from "../../common/VdMessage";
import Video from "./Video";
import Footer from "components/footer/Footer";
import Header from "components/header/Header";
import { useServerStatus } from "components/customHooks";

function ListMovie(props) {
  const { history } = props;
  const [loadedFailed, setLoadedFailed] = useState(false);
  const [movieMap, setMovieMap] = useState({});
  const [allMovieIds, setAllMovieIds] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const isOnline = useServerStatus();

  async function fetchData() {
    try {
      const { allIds, byId } = await getVideos();
      // order matters https://reactjs.org/docs/hooks-rules.html
      setMovieMap(byId);
      setAllMovieIds(allIds);
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
        {allMovieIds.filter(id =>  {
          const movie = movieMap[id]
          return searchValue === "" ? true : movie.name.toUpperCase().includes(searchValue.toUpperCase()) 
        })
        .map((id) => (
          <Video
            video={movieMap[id]}
            key={id}
            onSetVideo={setUpMovie}
          ></Video>
        ))}
      </div>
    );
  };
  if (!isOnline) {
    return <VdMessage text="server is unreachable"></VdMessage>;
  } else {
    return allMovieIds.length === 0 ? (
      <Loading></Loading>
    ) : (
      <div style={{ minHeight: "inherit"}}>
        <Header onChangeSearch={(ev) => {
          setSearchValue(ev.target.value)
        }}></Header>
        <div className="player-list">
          {displayContent()}
          <Footer></Footer>
        </div>
      </div>
     
    );
  }
}

export default ListMovie;
