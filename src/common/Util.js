import {VALID_FORMATS} from "./Constants"

export function isVideoFile(movieName){
    return VALID_FORMATS.get(movieName.slice(-3))
}  