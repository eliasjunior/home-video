import  { API_URL } from '../common/Constants';

export async function get(resourse) {
    try {
        const res = await fetch(`${API_URL}/${resourse}`);
        return await res.json();
    } catch (err) {
        return err;
    }
}

