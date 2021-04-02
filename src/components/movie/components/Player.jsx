import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import config from "config";
import "./player.css";
import VdMessage from "components/common/VdMessage";
import { loadVideo } from "./Presenter";
import Loading from "components/common/Loading";
import { SERIES_CATEG } from "common/constants";
const { SERVER_URL } = config();

function Player({ match }) {
  const [loadedFailed, setLoadedFailed] = useState(false);
  const [media, setMedia] = useState(undefined);
  const { params } = match;
  const onErrorHandle = () => {
    setLoadedFailed(!loadedFailed);
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const resp = await loadVideo(params.id, params.type === SERIES_CATEG);
        setMedia(resp);
      } catch (error) {
        setLoadedFailed(!loadedFailed);
      }
    };
    fetchMovie();
  }, []);

  const renderVideo = () => {
    const subPath =
      params.type === SERIES_CATEG
        ? `${SERVER_URL}/captions/${media.parentId}/${media.id}/${media.sub}`
        : `${SERVER_URL}/captions/${media.id}/${media.sub}`;
    const videoPath =
      params.type === SERIES_CATEG
        ? `${SERVER_URL}/${params.type}/${media.parentId}/${media.id}/${media.name}`
        : `${SERVER_URL}/${params.type}/${media.id}/${media.name}`;
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
    if (!media) {
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
