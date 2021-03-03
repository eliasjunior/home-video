import config from "../config";
const { SERVER_URL } = config();

export function requiredParameter(name, isThrow = true) {
  //TODO add log monitoring
  if (isThrow) {
    throw new Error(`${name} is required`);
  } else {
    console.error(`${name} is required *`);
  }
}

export function subscribeServerStatus(onHandleStatus) {
  const img = document.body.appendChild(document.createElement("img"));
  img.onload = function () {
    onHandleStatus("online");
    img.remove();
  };
  img.onerror = function () {
    onHandleStatus("offline");
    img.remove();
  };
  img.src = `${SERVER_URL}/public/tiny.png`;
}