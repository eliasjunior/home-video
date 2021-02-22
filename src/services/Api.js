import config from "../config";
const { SERVER_URL } = config();

export async function get(resourse) {
    console.log("SERVER_URL", SERVER_URL);
    try {
        const res = await fetch(`${SERVER_URL}/${resourse}`);
        return await res.json();
    } catch (err) {
        return err;
    }
}

