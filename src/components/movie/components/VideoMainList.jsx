import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./videoMainList.css";
import { getPosters } from "./Presenter";
import Loading from "../../common/Loading";
import Footer from "components/footer/Footer";
import Header from "components/header/Header";
import VdMessage from "components/common/VdMessage";
import PosterList from "./PosterList";
import { MOVIE_CATEG, SERIES_CATEG } from "common/constants";

function VideoMainList({ history }) {
  const [movieMap, setMovieMap] = useState({});
  const [allMovieIds, setAllMovieIds] = useState([]);
  const [allSeriesIds, setAllSeriesIds] = useState([]);
  const [seriesMap, setSeriesMap] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [query, setQuery] = useState(MOVIE_CATEG);

  async function fetchMovies() {
    try {
      const { allIds, byId, error } = await getPosters();
      if (!error) {
        // order matters https://reactjs.org/docs/hooks-rules.html
        setMovieMap(byId);
        setAllMovieIds(allIds);
      } else {
        setErrorMessage(error);
      }
    } catch (err) {
      setErrorMessage("Error fetching the data");
    }
  }
  async function fetchSeries() {
    try {
      const { allIds, byId, error } = await getPosters(true);
      if (!error) {
        // order matters https://reactjs.org/docs/hooks-rules.html
        setSeriesMap(byId);
        setAllSeriesIds(allIds);
      } else {
        setErrorMessage(error);
      }
    } catch (err) {
      setErrorMessage("Error fetching the data");
    }
  }
  useEffect(() => {
    if (query === MOVIE_CATEG) {
      fetchMovies();
    } else {
      fetchSeries();
    }
  }, [query]);

  const filterCategory = (value) => {
    setQuery(value);
  };

  const setUpMovie = (movieId, isSeries = false) => {
    history.push(
      `/display/${movieId}/${isSeries ? SERIES_CATEG : MOVIE_CATEG}`
    );
  };

  const displayContent = () => {
    if (query === MOVIE_CATEG) {
      return (
        <PosterList
          ids={allMovieIds}
          videoMap={movieMap}
          searchValue={searchValue}
          onSetVideo={setUpMovie}
        ></PosterList>
      );
    } else {
      return (
        <PosterList
          ids={allSeriesIds}
          videoMap={seriesMap}
          searchValue={searchValue}
          isSeries={true}
          onSetVideo={setUpMovie}
        ></PosterList>
      );
    }
  };
  if (errorMessage !== "") {
    return <VdMessage text={errorMessage}></VdMessage>;
  } else {
    return allMovieIds.length === 0 ? (
      <Loading></Loading>
    ) : (
      <div style={{ minHeight: "inherit" }}>
        <Header
          onChangeSearch={(ev) => {
            setSearchValue(ev.target.value);
          }}
          onFilterCat={filterCategory}
          history={history}
        ></Header>
        <div className="player-list">
          {displayContent()}
          <Footer></Footer>
        </div>
      </div>
    );
  }
}

export default VideoMainList;

VideoMainList.propTypes = {
  history: PropTypes.object.isRequired,
};
