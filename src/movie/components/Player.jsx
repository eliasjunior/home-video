import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import config from "../../config";
import "./player.css";
import VdMessage from "../../components/VdMessage";
import { loadVideo } from "./Presenter";
import Loading from "../../components/Loading";
const { SERVER_URL } = config();

function Player({ match }) {
  const [loadedFailed, setLoadedFailed] = useState(false);
  const [movie, setMovie] = useState(undefined);
  const { params } = match;
  const onErrorHandle = () => {
    setLoadedFailed(!loadedFailed);
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const resp = await loadVideo(params.id);
        setMovie(resp);
      } catch (error) {
        setLoadedFailed(!loadedFailed);
      }
    };
    fetchMovie();
  }, []);

  const renderVideo = () => {
    const subPath = SERVER_URL + "/captions/" + movie.id + "/" + movie.sub;
    const videoPath = SERVER_URL + "/videos/" + movie.id + "/" + movie.name;
    return (
      <video
        className="video-guy"
        onError={onErrorHandle}
        preload="metadata"
        controls
        id="videoPlayer"
        crossOrigin="anonymous"
        autoPlay={true}
      >
        <source src={videoPath} type="video/mp4"></source>
        <track
          src={subPath}
          label="English"
          kind="subtitles"
          srcLang="en"
          default
        ></track>
        <track
          src={subPath}
          label="Portuguese"
          kind="subtitles"
          srcLang="pt"
        ></track>
      </video>
    );
  };
  if (loadedFailed) {
    return <VdMessage></VdMessage>;
  } else {
    if (!movie) {
      return <Loading></Loading>;
    } else {
      return <div className="player">{renderVideo()}</div>;
    }
  }
}

export default Player;

Player.propTypes = {
  match: PropTypes.object,
};
