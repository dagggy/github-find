import getAndSortRepos from "./Api/Api";

export default function Main() {

    let test = getAndSortRepos("dagggy", "100", "1", "a");


    test.then(console.log);

    return <>123</>;
}