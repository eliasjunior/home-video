import { getVideosList } from "./VideosRepository";
describe("VideosService", () => {
  it("should return {} when response is corrupted", async () => {
    const get = () => Promise.resolve(undefined);
    const response = await getVideosList({ api: { get, urlResource: "" } });
    expect(response).toEqual({});
  });

  it("should return correct when response is []", async () => {
    const get = () => Promise.resolve([]);
    const response = await getVideosList({ api: { get, urlResource: "" } });
    expect(response).toEqual({ movieMap: [] });
  });
});
