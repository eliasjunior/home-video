import config from "../config";
const { SERVER_URL } = config();

export async function get(resource) {
  const res = await fetch(`${SERVER_URL}/${resource}`);
  const responseBody = await res.json();
  return {
    status: res.status,
    ...responseBody,
  };
}
export async function getById(resource, id) {
  const res = await fetch(`${SERVER_URL}/${resource}/${id}`);
  const responseBody = await res.json();
  return {
    status: res.status,
    ...responseBody,
  };
}


