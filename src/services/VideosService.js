export function getVideosList({ get, urlResource }) {
    return get(urlResource)
        .then(response => {
            return {
                movieMap: response
            }
        })
        .catch(err => console.error(err))
}