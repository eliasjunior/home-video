import React from "react";
import { Link } from "react-router-dom";
import { getFallBackImgPath } from "../common/Util";
import "./movieDetail.css";

export default function MovieDetail({ movie, baseFolder, onHandleVideoPath }) {
  const videoPath = `/videos/${baseFolder}_${movie.id}/${movie.name}`;
  return (
    <>
      <div className="detail__box">
        <img
          className="media-content__box--img-detail"
          src={getFallBackImgPath(movie.img)}
        ></img>
        <div className="media-content--detail"> {movie.name} </div>
      </div>
      <div className="detail__play">
        <Link
          className="link-base link-btn"
          to={`/display/${movie.id}`}
          onClick={() => onHandleVideoPath(videoPath, movie)}
        >
          Play
        </Link>
      </div>
    </>
  );
}
