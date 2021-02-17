import React from "react";
import { Link } from "react-router-dom";
import { getMovieImg } from "./Presenter";
import "./movieDetail.css";

export default function MovieDetail({ movie, baseFolder, onHandleVideoPath }) {
  const videoPath = `/videos/${baseFolder}_${movie.id}/${movie.name}`;
  return (
    <>
      <div className="detail__box">
        <img
          className="media-content__box--img-detail"
          src={getMovieImg(movie)}
        ></img>
        <div className="media-content--detail"> {movie.name} </div>
        <div className="media-content--detail"> {movie.sub} </div>
        <div className="detail__play">
        <Link
          className="link-base link-btn"
          to={`/display/${movie.id}`}
          onClick={() => onHandleVideoPath(videoPath, movie)}
        >
          Play
        </Link>
      </div>
      </div>
    </>
  );
}
