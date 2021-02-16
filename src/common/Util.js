import { VALID_FORMATS, API_URL } from "./constants";

export function isVideoFile(movieName){
    return VALID_FORMATS.get(movieName.slice(-3))
}  

export function getFallBackImgPath (imgName) {
    //this would change in a proper img server
    return API_URL + "/public/" + imgName;
};
