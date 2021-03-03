import { requiredParameter } from "../../../common/Util";
import { get, getById } from "../../../services/Api";
import { getVideosList, getVideo } from "../VideosRepository";
import config from "../../../config";
const { SERVER_URL } = config();

export async function getVideos() {
  const api = {
    get,
  };
  return getVideosList({ api });
}

export async function loadVideo(id = requiredParameter("video id")) {
  const api = {
    getById,
  };
  return getVideo({ api, id });
}

export function getMovieImg(id = requiredParameter("id")) {
  return `${SERVER_URL}/images/${id}`;
}
