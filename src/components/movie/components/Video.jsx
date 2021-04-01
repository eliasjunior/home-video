import React from "react";
import PropTypes from "prop-types";
import { getMovieImg } from "./Presenter";
import "./video.css";
import { DialogList } from "components/common/DialogList";

export default function Video({ video, onSetVideo, isSeries }) {
  const { id, name, fileIds } = video;

  const getVideo = () => {
    return isSeries ? (
      <img
        className="media-content__box--img"
        key={id}
        alt="Movie poster"
        src={getMovieImg(id, isSeries)}
      ></img>
    ) : (
      <img
        onClick={() => onSetVideo(id, isSeries)}
        className="media-content__box--img"
        key={id}
        alt="Movie poster"
        src={getMovieImg(id, isSeries)}
      ></img>
    );
  };
  return (
    <div className="media-content__box ">
      <div className="media-content__box--img-box">
        {getVideo()}
        <div className="media-content--name">
          {" "}
          {name}
          {isSeries ? (
            <DialogList
              list={fileIds}
              onAction={onSetVideo}
              parentId={id}
            ></DialogList>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

Video.propTypes = {
  video: PropTypes.object.isRequired,
  onSetVideo: PropTypes.func,
  isSeries: PropTypes.bool,
};
