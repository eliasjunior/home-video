import  constants from '../constants';
const { API_URL }  = constants

export function get(resourse) {
    return fetch(`${API_URL}/${resourse}`)
            .then(res => res.json())
            .then(res => res)
            .catch(err => err)
}

