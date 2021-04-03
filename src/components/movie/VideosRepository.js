export async function getVideosList({ api, isSeries }) {
  const { get } = api;
  try {
    const response = isSeries ? await get("series") : await get("videos");
    switch (response.status) {
      case 500:
        return { mediaMap: { error: response } };
      default:
        return { mediaMap: response };
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
