import { SERIES_CATEG, MOVIE_CATEG } from "common/constants";
import { requiredParameter } from "common/Util";
import { getById } from "services/Api";
import { getVideo } from "../VideosRepository";
import config from "config";
const { SERVER_URL } = config();

export function getTrackSrc({ mediaType, media }) {
  return mediaType === SERIES_CATEG
    ? `${SERVER_URL}/captions/${media.parentId}/${media.id}/${media.sub}`
    : `${SERVER_URL}/captions/${media.id}/${media.sub}`;
}

export function getVideoSrc({ mediaType, media }) {
  return mediaType === SERIES_CATEG
    ? `${SERVER_URL}/${mediaType}/${media.parentId}/${media.id}/${media.name}`
    : `${SERVER_URL}/${mediaType}/${media.id}/${media.name}`;
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
