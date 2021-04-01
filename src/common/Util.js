import config from "../config";
import { IMG_CHECK_STATUS } from "./constants";
const { SERVER_URL } = config();

export function requiredParameter(name, isThrow = true) {
  if (isThrow) {
    console.warn("requiredParameter, the code should be wrap in a try catch");
    throw new Error(`${name} is required`);
  } else {
    console.error(`${name} is required *`);
  }
}

export function subscribeServerStatus({
  onHandleStatus,
  imgName = IMG_CHECK_STATUS,
}) {
  const img = document.body.appendChild(document.createElement("img"));
  img.onload = function () {
    onHandleStatus(true);
    img.remove();
  };
  img.onerror = function () {
    onHandleStatus(false);
    img.remove();
  };
  img.src = `${SERVER_URL}/public/${imgName}`;
}
