import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./player.css";
import Loading from "components/common/Loading";
import { SERIES_CATEG } from "common/constants";
import { getTrackSrc, getVideoSrc, loadVideo } from "./Player.presenter";
import { HAS_ERROR } from "main/Reducer";

function Player({ match, dispatch }) {
  const [media, setMedia] = useState(undefined);
  const { params } = match;
  const onErrorHandle = () => {
    dispatch({ type: HAS_ERROR, payload: undefined });
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const resp = await loadVideo(params.id, params.type === SERIES_CATEG);
        setMedia(resp);
      } catch (error) {
        dispatch({ type: HAS_ERROR, payload: undefined });
      }
    };
    fetchMovie();
  }, []);

  return !media ? (
    <Loading></Loading>
  ) : (
    <div className="player">
      {
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
      }
    </div>
  );
}

export default Player;

Player.propTypes = {
  match: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};
