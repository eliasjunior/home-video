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

export function getMovieImg({ name, id }) {
  //this would change in a proper img server
  if (name.includes(getImgFallBackName())) {
    return getServerUrl() + "/static/" + name;
  } else {
    return `${getServerUrl()}/images/${id}/${name} `;
  }
}
