import { requiredParameter } from "../common/Util";
import { get } from "../services/Api";
import { getVideosList } from "../services/VideosService";
import config from "../config";
const { SERVER_URL } = config();

export async function getVideos() {
  const api = {
    get,
  };
  return getVideosList({ api });
}

export function getMovieImg(id = requiredParameter("id")) {
  return `${SERVER_URL}/images/${id}`;
}
