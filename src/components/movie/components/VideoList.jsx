import React from "react";
import PropTypes from "prop-types";
import Video from "./Video";

export default function VideoList({
  ids,
  videoMap,
  searchValue,
  onSetVideo,
  isSeries,
}) {
  return (
    <div className="list-content">
      {ids
        .filter((id) => {
          const movie = videoMap[id];
          return searchValue === ""
            ? true
            : movie.name.toUpperCase().includes(searchValue.toUpperCase());
        })
        .map((id) => (
          <Video
            video={videoMap[id]}
            key={id}
            onSetVideo={onSetVideo}
            isSeries={isSeries}
          ></Video>
        ))}
    </div>
  );
}

VideoList.propTypes = {
  ids: PropTypes.array.isRequired,
  videoMap: PropTypes.object.isRequired,
  searchValue: PropTypes.string,
  onSetVideo: PropTypes.func.isRequired,
  isSeries: PropTypes.bool,
};
