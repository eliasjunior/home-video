import React from "react";
import PropTypes from "prop-types";
import { getMovieImg } from "./Presenter";
import "./video.css";

export default function Video({ video, onSetVideo}) {
  const { id, name } = video;
  return (
    <div className="media-content__box " >
      <div className="media-content__box--img-box">
        <img
          onClick={() => onSetVideo(id)}
          className="media-content__box--img"
          key={id}
          alt="Movie poster"
          src={getMovieImg(id)}
        ></img>
        <div className="media-content--name"> {name} </div>
      </div>
    </div>
  );
}

Video.propTypes = {
  video: PropTypes.object.isRequired,
  onSetVideo: PropTypes.func.isRequired,
};
