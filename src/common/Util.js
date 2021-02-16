import { VALID_FORMATS, getServerUrl } from "./constants";

export function isVideoFile(movieName){
    return VALID_FORMATS.get(movieName.slice(-3))
}  

export function getFallBackImgPath (imgName) {
    //this would change in a proper img server
    return getServerUrl() + "/public/" + imgName;
};
