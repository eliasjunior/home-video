import { get } from '../services/Api';

import { getVideosList } from "../services/VideosService"

export async function getVideos({urlResource}) {
     return getVideosList({get, urlResource}) 
}