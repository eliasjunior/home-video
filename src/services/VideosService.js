/* eslint-disable no-useless-catch */
export async function getVideosList({ api }) {
  const { get } = api;
  try {
    const response = await get("videos");
    return { movieMap: response };
  } catch (err) {
    throw err;
  }
}

