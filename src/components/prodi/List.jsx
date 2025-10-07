import React, {useEffect, useState} from "react"
import axios from "axios"

export default function List() {

    // state fakultas untuk menyimpan data response API Fakultas
    const [prodi, setProdi] = useState([])

    //
    useEffect( ()=> {
        axios
        .get("https://project-apiif-3-b.vercel.app/api/api/prodi")
        .then( (response) => {
            console.log(response.data);
            setProdi(response.data.result);
        } )
    },[])

    return(
        
        <div>
            <h2>List Prodi</h2>
            <ul>
                {prodi.map( (data) => (
                    <li>{data.nama}</li>
                ))}
            </ul>
        </div>
    )
}