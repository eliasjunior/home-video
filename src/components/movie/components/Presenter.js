import { requiredParameter } from "common/Util";
import { get, getById } from "services/Api";
import { getVideosList, getVideo, getSeriesFolders } from "../VideosRepository";
import config from "config";
import { MOVIE_CATEG, SERIES_CATEG } from "common/constants";
const { SERVER_URL } = config();

export async function getVideos() {
  const api = {
    get,
  };
  try {
    const { movieMap } = await getVideosList({ api });
    if (!movieMap.error) {
      //TODO need to map the byId objects to decouple changes from the server
      const { allIds = [], byId = {} } = movieMap;
      return {
        allIds,
        byId,
      };
    } else {
      return {
        error: movieMap.error.message,
        allIds: [],
        byId: {},
      };
    }
  } catch (err) {
    console.error("presenter could not map response", err);
  }
}

//TODO same code refactor
export async function getSeries() {
  const api = {
    get,
  };
  const { videoMap } = await getSeriesFolders({ api });
  if (!videoMap.error) {
    const { allIds = [], byId = {} } = videoMap;
    return {
      allIds,
      byId,
    };
  } else {
    return {
      error: videoMap.error.message,
      allIds: [],
      byId: {},
    };
  }
}

export async function loadVideo(
  id = requiredParameter("video id"),
  isSeries = false
) {
  const api = {
    getById,
  };
  const resource = isSeries ? SERIES_CATEG : MOVIE_CATEG;
  return getVideo({ api, id, resource });
}

// TODO review isSeries = false
export function getMovieImg(id = requiredParameter("id"), isSeries = false) {
  return isSeries
    ? `${SERVER_URL}/images/series/${id}`
    : `${SERVER_URL}/images/${id}`;
}
