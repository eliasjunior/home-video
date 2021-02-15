import React from "react";
import { Link } from "react-router-dom";

export default function MovieDetail({ movie, baseFolder, onHandleVideoPath }) {
  const videoPath = `/videos/${baseFolder}_${movie.id}/${movie.name}`;
  return (
    <div>
      <div>
        <div>{movie.name}</div>
        <div>{movie.sub}</div>
      </div>
      <Link
        className="link-base link-btn"
        to={`/display/${movie.id}`}
        onClick={() => onHandleVideoPath(videoPath, movie)}
      >
        Play
      </Link>
    </div>
  );
}
