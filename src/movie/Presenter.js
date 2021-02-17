import { getImgFallBackName, getServerUrl } from "../common/Util";
import { get } from "../services/Api";

import { getVideosList } from "../services/VideosService";

export async function getVideos() {
  const api = {
    get,
    urlResource: "movies",
  };
  return getVideosList({ api });
}

export function getMovieImg({ img, id }) {
  const api = {
    get,
    urlResource: "images",
  };
  //this would change in a proper img server
  if (img.includes(getImgFallBackName())) {
    return getServerUrl() + "/static/" + img;
  } else {
    return `${getServerUrl()}/images/${id}/${img} `;
    //  return getMovieFile({ api, movie: { id, img } });
  }
}
