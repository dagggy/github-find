import getAndSortRepos from "./Api/Api";
import Form from "./Form/Form";
import React, { useState, useEffect } from "react";

export default function Main() {

    const [repos, setRepos] = useState([]);

    function getString(name:string): String {
        const params = new URLSearchParams(window.location.search);
        if (params.get(name)) {
            let a: String = String(params.get(name))
            return a;
        }
        return "";
    }

    useEffect(() => {
        

        getAndSortRepos(getString("user"), getString("per_page"), getString("page"), getString("phrase")).then((res) => {
            if (res !== repos){
                setRepos(res);
            }
        });
    }, [])
    

    console.log(repos);

    return <><Form/></>;
}