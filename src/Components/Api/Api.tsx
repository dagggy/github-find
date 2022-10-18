

// https://api.github.com/search/code?q=let+user:dagggy+language:javascript

// function getReposByUser(user: String, perPage: String, page: String) {
//     return fetch("https://api.github.com/users/" + user + "/repos?per_page=" + perPage + "&page=" + page)
//     .then(response => {return response.json()})
//     .catch(error => {console.error(error);});
// }

export default function getAndSortRepos(user: String, perPage: String, page: String, phrase: String, language: String) {
    return fetch("https://api.github.com/search/code?q=" + phrase + "+user:" + user + "+language:" + language + "&per_page=" + perPage + "&page=" + page)
    .then(response => {return response.json()})
    .catch(error => {console.error(error);});
}