const {
  NODE_ENV,
  REACT_APP_SERVER_HOST,
  REACT_APP_SERVER_PROTOCOL,
  REACT_APP_MY_VAR,
} = process.env;

export default function config() {
  const result = {};
  console.log("MY_VAR React", REACT_APP_MY_VAR);
  if (NODE_ENV === "production") {
    result.PROTOCOL = REACT_APP_SERVER_PROTOCOL;
    result.PORT = process.env.PORT || 8080;
    result.host = REACT_APP_SERVER_HOST;
  } else {
    result.PROTOCOL = "http";
    result.PORT = 8080;
    result.host = "localhost";
  }
  result.SERVER_URL = `${result.PROTOCOL}://${result.host}:${result.PORT}`;
  return result;
}
