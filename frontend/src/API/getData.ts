import axios from "axios";

const URL_API = "http://localhost:3001/api/"

export const getData = async (random : number) : Promise<Array<string> | null>=>{
    return await axios.get(URL_API+"get", {
        params:{
            random: random,
        }
    }).then(res => {
        if(res.data)
            return res.data as Array<string>;
        else
            return null
    }).catch(e =>{
        console.error(`${e.name} : ${e.message}`);
        return null;
    });
}