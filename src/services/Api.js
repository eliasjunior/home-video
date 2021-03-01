import config from "../config";
const { SERVER_URL } = config();

export async function get(resourse) {
  try {
    const res = await fetch(`${SERVER_URL}/${resourse}`);
    return await res.json();
  } catch (err) {
    return err;
  }
}
export async function getById(resourse, id) {
  try {
    const res = await fetch(`${SERVER_URL}/${resourse}/${id}`);
    return await res.json();
  } catch (err) {
    return err;
  }
}


