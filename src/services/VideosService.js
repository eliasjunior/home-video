export async function getVideosList({ api }) {
  const { get, urlResource } = api;
  try {
    const response = await get(urlResource);
    return { movieMap: response };
  } catch (err) {
    console.error(err);
  }
}

