

function getReposByUser(user: String, perPage: String, page: String) {
    fetch("https://api.github.com/users/" + user + "/repos?per_page=" + perPage + "&page=" + page)
    .then(response => {return response.json})
    .catch(error => {console.error(error);});
}

export default function getAndSortRepos(user: String, perPage: String, page: String, phrase: string) {
    getReposByUser(user, perPage, page);
}