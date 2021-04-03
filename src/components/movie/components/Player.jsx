import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./player.css";
import VdMessage from "components/common/VdMessage";
import Loading from "components/common/Loading";
import { SERIES_CATEG } from "common/constants";
import { getTrackSrc, getVideoSrc, loadVideo } from "./Player.presenter";

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
        <source
          src={getVideoSrc({ mediaType: params.type, media })}
          type="video/mp4"
        ></source>
        <track
          src={getTrackSrc({ mediaType: params.type, media })}
          label="English"
          kind="subtitles"
          srcLang="en"
          default
        ></track>
        <track
          src={getTrackSrc({ mediaType: params.type, media })}
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
