import { getServerUrl, requiredParameter } from "../common/Util";
import { get } from "../services/Api";

import { getVideosList } from "../services/VideosService";

export async function getVideos() {
  const api = {
    get,
    urlResource: "movies",
  };
  return getVideosList({ api });
}

export function getMovieImg({
  name = requiredParameter("name"),
  id = requiredParameter("name"),
} = {}) {
  return `${getServerUrl()}/images/${id}/${name} `;
}
