export async function getVideosList({ api }) {
  const { get } = api;
  try {
    const response = await get("videos");
    switch (response.status) {
      case 500:
        return { movieMap: {error : response} };
      default:
        return { movieMap: response };
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}
//TODO code just the same
export async function getSeriesFolders({ api }) {
  const { get } = api;
  try {
    const response = await get("series");
    switch (response.status) {
      case 500:
        return { videoMap: {error : response} };
      default:
        return { videoMap: response };
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getVideo(obj) {
  const { api, resource } = obj;
  const { getById } = api;
  try {
    const response = await getById(resource, obj.id);
    const { name, id, sub, img, parentId } = response;
    return { name, id, sub, img, parentId };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
