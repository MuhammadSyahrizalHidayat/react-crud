import React, {useEffect, useState} from "react"
import axios from "axios"

export default function List() {

    // state fakultas untuk menyimpan data response API Fakultas
    const [fakultas, setFakultas] = useState([])

    //
    useEffect( ()=> {
        axios
        .get("https://project-apiif-3-b.vercel.app/api/api/fakultas")
        .then( (response) => {
            console.log(response.data);
            setFakultas(response.data.result);
        } )
    },[])

    return(
        
        <div>
            <h2>List Fakultas</h2>
            <ul>
                {fakultas.map( (data) => (
                    <li>{data.nama}</li>
                ))}
            </ul>
        </div>
    )
}