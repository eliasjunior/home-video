import { VALID_FORMATS } from "./constants";
const {
  REACT_APP_SERVER_DEV_PROTOCOL,
  REACT_APP_SERVER_DEV_HOST,
  REACT_APP_SERVER_DEV_PORT,
  NODE_ENV,
} = process.env;

export function isVideoFile(movieName){
    return VALID_FORMATS.get(movieName.slice(-3))
}  

export function getImgFallBackName() {
  //TODO get from the API
  return "movie_fallback";
}

export function getServerUrl() {
  return "http://192.168.0.234:8080";
  console.log("env", NODE_ENV);
  if (NODE_ENV === "development") {
    return `${REACT_APP_SERVER_DEV_PROTOCOL}://${REACT_APP_SERVER_DEV_HOST}:${REACT_APP_SERVER_DEV_PORT}`;
  } else {
    return "http://192.168.0.234:8080";
  }
}