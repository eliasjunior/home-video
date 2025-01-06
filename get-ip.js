const fs = require("fs");
const os = require("os");

function getLocalIPAddress() {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    for (const iface of networkInterfaces[interfaceName]) {
      // Look for the IPv4, non-internal address
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "127.0.0.1"; // Fallback to localhost
}

const ipAddress = getLocalIPAddress();
fs.writeFileSync(".env", `REACT_APP_SERVER_HOST=${ipAddress}\n`, { flag: "a" });
console.log(`Local IP address written to .env: ${ipAddress}`);
