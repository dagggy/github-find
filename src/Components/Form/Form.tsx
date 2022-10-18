export default function Form() {
    const params = new URLSearchParams(window.location.search);
    
    function getString(params:URLSearchParams, name:string): string|undefined {
        if (params.get(name)) {
            let a: string = String(params.get(name))
            return a;
        }
        return "";
    }
    
    return <>
        <form method="get">
            <input type="text" id="user" placeholder="Username" name="user" defaultValue={getString(params, "user")} required></input><br/>
            <input type="text" id="phrase" placeholder="Phrase" name="phrase" defaultValue={getString(params, "phrase")} required></input><br/>
            <select name="language" id="language">
                <option value="javascript">Javascript</option>
                <option value="java">Java</option>
                <option value="go">GO</option>
            </select><br/>
            <input type="range" id="per_page" min="5" max="100" step="5" name="per_page" defaultValue={getString(params, "per_page")}></input>
            <input type="hidden" id="page" name="page" defaultValue={getString(params, "page")}></input>
            <input type="submit" value="Submit"></input>
        </form>
    </>
}