const {
    REACT_APP_SERVER_DEV_PROTOCOL,
    REACT_APP_SERVER_DEV_HOST,
    REACT_APP_SERVER_DEV_PORT,
    NODE_ENV,
  } = process.env;

export function getServerUrl() {
  console.log("env", NODE_ENV);

  if (NODE_ENV === "development") {
    return `${REACT_APP_SERVER_DEV_PROTOCOL}://${REACT_APP_SERVER_DEV_HOST}:${REACT_APP_SERVER_DEV_PORT}`;
  } else {
    return "http://192.168.0.234:9000";
  }
}
export const VALID_FORMATS = new Map([
    ['mp4', 'mp4'], 
    ['avi','avi'], 
    ['mkv', 'mkv']
]);
