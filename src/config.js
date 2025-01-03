const { NODE_ENV, REACT_APP_SERVER_HOST, REACT_APP_SERVER_PROTOCOL } =
  process.env;

export default function config() {
  const result = {};
  console.log(`React end-point => ${REACT_APP_SERVER_HOST}`);
  console.log(`Env => ${NODE_ENV }`);
  if (NODE_ENV === "production") {
    result.PROTOCOL = REACT_APP_SERVER_PROTOCOL;
    result.PORT = process.env.PORT || 8080;
    result.host = REACT_APP_SERVER_HOST;
  } else {
    result.PROTOCOL = "http";
    result.PORT = 8080;
    result.host = REACT_APP_SERVER_HOST; // testing purposes, pointing to prod
  }
  result.SERVER_URL = `${result.PROTOCOL}://${result.host}:${result.PORT}`;
  return result;
}
