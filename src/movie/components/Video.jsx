import React from "react";
import PropTypes from "prop-types";
import { getMovieImg } from "./Presenter";
import { Link } from "react-router-dom";
import "./movie.css";

export default function Video({ video, onSetVideo, isDetail = false }) {
  const { id, name, sub } = video;
  const displayPlay = () => {
    if (!isDetail) {
      return "";
    }
    return (
      <>
        <div className="media-content--name"> {sub} </div>
        <div className="detail__play">
          <Link className="link-base link-btn" to={`/display/${id}`}>
            Play {video.name}
          </Link>
        </div>
      </>
    );
  };
  return (
    <div className="media-content__box " onClick={() => onSetVideo(id)}>
      <div className="media-content__box--img-box">
        <img
          className="media-content__box--img"
          key={id}
          alt="Movie poster"
          src={getMovieImg(id)}
        ></img>
        <div className="media-content--name"> {name} </div>
        {displayPlay()}
      </div>
    </div>
  );
}

Video.propTypes = {
  video: PropTypes.object.isRequired,
  onSetVideo: PropTypes.func.isRequired,
  isDetail: PropTypes.bool,
};
