import React, { useState } from "react";
import { getServerUrl } from "../common/constants";
import Footer from "../footer/Footer";
import "./movie.css";

function Player(props) {
  const [loadedFailed, setLoadedFailed] = useState(false);
  const { movie } = props;
  const onErrorHandle = () => {
    setLoadedFailed(!loadedFailed);
  };
  const renderVideo = () => {
    const subPath = getServerUrl() + "/captions/" + movie.id + "/" + movie.sub;
    const videoPath = getServerUrl() + "/videos/" + movie.id + "/" + movie.name;

    if (loadedFailed) {
      return (
        <div>
          <div className="message-error">Video Failed to load</div>
          <Footer></Footer>
        </div>
      );
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
  return <div>{renderVideo()}</div>;
}

export default Player;
