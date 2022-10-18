

function getReposByUser(user: String, perPage: String, page: String) {
    return fetch("https://api.github.com/users/" + user + "/repos?per_page=" + perPage + "&page=" + page)
    .then(response => {return response.json()})
    .catch(error => {console.error(error);});
}

export default function getAndSortRepos(user: String, perPage: String, page: String, phrase: string) {
    console.log("https://api.github.com/users/" + user + "/repos?per_page=" + perPage + "&page=" + page);
    return getReposByUser(user, perPage, page);
}