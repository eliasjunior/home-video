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

export function getServerUrl() {
  return "http://192.168.0.234:8080";
  if (NODE_ENV === "development") {
    return `${REACT_APP_SERVER_DEV_PROTOCOL}://${REACT_APP_SERVER_DEV_HOST}:${REACT_APP_SERVER_DEV_PORT}`;
  } else {
    return "http://192.168.0.234:8080";
  }
}

export function requiredParameter(name, isThrow = true) {
  //TODO add log monitoring
  if (isThrow) {
    throw new Error(`${name} is required`);
  } else {
    console.error(`${name} is required *`);
  }
}