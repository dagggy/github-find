import getAndSortRepos from "./Api/Api";
import Form from "./Form/Form";
import React, { useState, useEffect } from "react";
import { ReactElement } from "react";
import useModal from "./Hooks/useModal";
import Modal from "./Elements/Modal";

export default function Main() {

    const [repos, setRepos] = useState([]);
    const [load, setLoad] = useState(false)
    const [loading, setLoading] = useState(true);
    const {isOpen, toggle} = useModal();

    function getString(name:string): String {
        const params = new URLSearchParams(window.location.search);
        if (params.get(name)) {
            let a: String = String(params.get(name))
            return a;
        }
        return "";
    }

    useEffect(() => {
        setLoading(true);
        setLoad(false);
        if (getString("user").length !== 0 && getString("phrase").length !== 0){
            getAndSortRepos(getString("user"), getString("per_page"), getString("page"), getString("phrase"), getString("language")).then((res) => {
                if (res !== repos){
                    setRepos(res);
                    setLoading(false);
                    if(repos !== undefined){
                        setLoad(true);
                    }
                }
            });
        }
    }, [])
    
    function Fload() {
        return <>Empty</>;
    }

    function Table(): JSX.Element[] {
        type ObjectKey = keyof typeof repos;
        let items = "items" as ObjectKey;
        let jsx: string[] = [];
        let returns = [];
        if(load){
        // @ts-ignore
            for (let i = 0; i < repos[items].length; i++) {
                // @ts-ignore
                jsx.push([repos[items][i]["name"], repos[items][i]["html_url"], repos[items][i]["repository"]["description"], repos[items][i]["repository"]["owner"]["login"], repos[items][i]["repository"]["owner"]["avatar_url"],]);
            }
            for(let i=0; i<jsx.length; i++) {
                returns.push(
                    <tbody key={jsx[i][0] + i}>
                        <td><a href={jsx[i][1]} rel="noreferrer" target="_blank">{jsx[i][0]}</a></td>
                        <td>{jsx[i][2]}</td>
                        <td>{jsx[i][3]}</td>
                        <td><button onClick={toggle}>View</button><Modal isOpen={isOpen} toggle={toggle}><img src={jsx[i][4]} alt={jsx[i][3]}></img></Modal></td>
                    </tbody>
                );
            }
            return returns;
        }
        return [<></>];
    }

    function PageSwitchButtons(): JSX.Element {
        let page: number = Number(getString("page"));
        let url = String(window.location.href);
        let newUrl = url.substring(0, url.lastIndexOf("&page=")) + "&page=";
        if(page > 1) {
            return(
                // eslint-disable-next-line jsx-a11y/anchor-has-content
                <div><a href={newUrl + (page-1)}>←</a> {page} <a href={newUrl + (page+1)}>→</a></div>
            )
        }
        return <div>← {page} <a href={newUrl + (page+1)}>→</a></div>;
    }

    return <>
        <Form/> 
        {loading ? <Fload/> :
        <table>
            <tbody>
                <th>File</th>
                <th>Description</th>
                <th>User</th>
                <th>Profile Picture</th>
            </tbody>
            {Table()}
            {PageSwitchButtons()}
        </table>
        }
    </>
    
}