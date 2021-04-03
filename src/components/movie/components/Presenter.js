import { requiredParameter } from "common/Util";
import { get } from "services/Api";
import { getVideosList } from "../VideosRepository";
import config from "config";
const { SERVER_URL } = config();

export async function getPosters(isSeries = false) {
  const api = {
    get,
  };
  try {
    const { mediaMap } = await getVideosList({ api, isSeries });
    if (!mediaMap.error) {
      //TODO need to map the byId objects to decouple changes from the server
      const { allIds = [], byId = {} } = mediaMap;
      return {
        allIds,
        byId,
      };
    } else {
      return {
        error: mediaMap.error.message,
        allIds: [],
        byId: {},
      };
    }
  } catch (err) {
    console.error("presenter could not map response", err);
  }
}

// TODO review isSeries = false
export function getMovieImg(
  id = requiredParameter("video id"),
  isSeries = false
) {
  return isSeries
    ? `${SERVER_URL}/images/series/${id}`
    : `${SERVER_URL}/images/${id}`;
}

// private
