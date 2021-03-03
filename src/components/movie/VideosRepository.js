/* eslint-disable no-useless-catch */
export async function getVideosList({ api }) {
  const { get } = api;
  try {
    const response = await get("videos");
    return { movieMap: response };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getVideo(obj) {
  const { api } = obj;
  const { getById } = api;
  try {
    const response = await getById("videos", obj.id);
    const { name, id, sub, img } = response;
    return { name, id, sub, img };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
