import { requiredParameter } from "../../../common/Util";
import { get, getById } from "../../../services/Api";
import { getVideosList, getVideo } from "../VideosRepository";
import config from "../../../config";
const { SERVER_URL } = config();

export async function getVideos() {
  const api = {
    get,
  };
  try {
    const { movieMap } = await getVideosList({ api });
    const { allIds = [], byId = {} } = movieMap;
    return {
      allIds,
      byId,
    };
  } catch (err) {
    console.error("presenter could not map response", err);
  }
 
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
