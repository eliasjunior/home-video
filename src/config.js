const { NODE_ENV, REACT_APP_SERVER_PROTOCOL } = process.env;

export default function config() {
  const result = {};
  const host = getLocalIPAddress();
  console.log(`React end-point => ${getLocalIPAddress()}`);
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

function getLocalIPAddress() {
  const os = require("os");

  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    for (const iface of networkInterfaces[interfaceName]) {
      // Look for the IPv4, non-internal address
      if (iface.family === "IPv4" && !iface.internal) {
        console.log("Local Host IP:", iface.address);
        return iface.address;
      }
    }
  }
  return "127.0.0.1"; // Fallback to localhost
}
