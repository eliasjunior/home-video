const {
    REACT_APP_SERVER_DEV_PROTOCOL,
    REACT_APP_SERVER_DEV_HOST,
    REACT_APP_SERVER_DEV_PORT,
    NODE_ENV,
  } = process.env;

export const API_URL = (
    REACT_APP_SERVER_DEV_PROTOCOL +
    "://" +
    REACT_APP_SERVER_DEV_HOST +
    ":" +
    REACT_APP_SERVER_DEV_PORT 
  );
export const VALID_FORMATS = new Map([
    ['mp4', 'mp4'], 
    ['avi','avi'], 
    ['mkv', 'mkv']
]);
