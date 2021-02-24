import React, { useState } from "react";
import config from "../config";
import "./player.css";
import Message from "../common/Message";
const { SERVER_URL } = config();

function Player(props) {
  const [loadedFailed, setLoadedFailed] = useState(false);
  const { movie } = props;
  const onErrorHandle = () => {
    setLoadedFailed(!loadedFailed);
  };
  const renderVideo = () => {
    const subPath = SERVER_URL + "/captions/" + movie.id + "/" + movie.sub;
    const videoPath = SERVER_URL + "/videos/" + movie.id + "/" + movie.name;

    if (loadedFailed) {
      return <Message></Message>;
    } else {
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
    }
  };
  return <div className="player">{renderVideo()}</div>;
}

export default Player;
