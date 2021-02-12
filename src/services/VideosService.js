import { get } from '../services/Api';

export function getVideos({ urlResource }) {
    return get(urlResource)
        .then(response => response)
        .catch(err => console.error(err))
}