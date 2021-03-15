import config from "../config";
const { SERVER_URL } = config();

export async function get(resource) {
  try {
    const res = await fetch(`${SERVER_URL}/${resource}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return err;
  }
}
export async function getById(resource, id) {
  try {
    const res = await fetch(`${SERVER_URL}/${resource}/${id}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return err;
  }
}


