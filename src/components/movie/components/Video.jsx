import React, { useState } from "react";
import PropTypes from "prop-types";
import { getMovieImg } from "./Presenter";
import "./video.css";
import { DialogList } from "components/common/DialogList";

export default function Video({ video, onSetVideo, isSeries }) {
  const [displayEp, setDisplayEp] = useState(false);
  const { id, name, fileIds } = video;


  const getVideo = () => {
    return isSeries ? (
      <img
        className="media-box__img-box--ext"
        key={id}
        alt="Movie poster"
        src={getMovieImg(id, isSeries)}
      ></img>
    ) : (
      <img
        onClick={() => onSetVideo(id, isSeries)}
        className="media-box__img-box--ext"
        key={id}
        alt="Movie poster"
        src={getMovieImg(id, isSeries)}
      ></img>
    );
  };
  return (
    <div className="media-box" onClick={() => setDisplayEp(!displayEp)}>
      <div className="media-box__img-box">
        {getVideo()}
        <div className="media-box__img-box--title"> {name}</div>
      </div>
      
      {isSeries && displayEp ? (
        <DialogList
          list={fileIds}
          onAction={onSetVideo}
          parentId={id}
        ></DialogList>
      ) : (
        ""
      )}
    </div>
  );
}

Video.propTypes = {
  video: PropTypes.object.isRequired,
  onSetVideo: PropTypes.func,
  isSeries: PropTypes.bool,
};
