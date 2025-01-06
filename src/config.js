const { NODE_ENV, REACT_APP_SERVER_PROTOCOL, REACT_APP_SERVER_HOST } =
  process.env;

export default function config() {
  const result = {};

  const host = REACT_APP_SERVER_HOST || "localhost";
  console.log(`Local IP address written to .env: ${host}`);

  console.log(`React server host => ${host}`);
  console.log(`Env => ${NODE_ENV}`);
  if (NODE_ENV === "production") {
    result.PROTOCOL = REACT_APP_SERVER_PROTOCOL;
    result.PORT = process.env.PORT || 8080;
    result.host = host;
  } else {
    result.PROTOCOL = "http";
    result.PORT = 8080;
    result.host = host; // testing purposes, pointing to prod
  }
  result.SERVER_URL = `${result.PROTOCOL}://${result.host}:${result.PORT}`;
  return result;
}
