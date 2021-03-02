/* eslint-disable no-undef */
const { NODE_ENV } = process.env;

export default function config() {
  const result = {};
  if (NODE_ENV === "production") {
    result.PROTOCOL = "http";
    result.PORT = process.env.PORT || 8080;
    result.host = "192.168.0.234";
  } else {
    result.PROTOCOL = "http";
    result.PORT = 8080;
    result.host = "localhost";
  }
  result.SERVER_URL = "http://192.168.0.234:8080";
  // result.SERVER_URL = `${result.PROTOCOL}://${result.host}:${result.PORT}`;
  return result;
}
