import { getServerUrl } from "../common/constants";

export async function get(resourse) {
    try {
        const res = await fetch(`${getServerUrl()}/${resourse}`);
        return await res.json();
    } catch (err) {
        return err;
    }
}

