import React, {useEffect, useState} from "react"
import axios from "axios"

export default function List() {

    // state prodi untuk menyimpan data response API Fakultas
    const [prodi, setProdi] = useState([])

    // panggil API Prodi menggunakan useEffect dan axios
    useEffect( ()=> {
        axios
        .get("https://project-apiif-3-b.vercel.app/api/api/prodi")
        .then( (response) => {
            console.log(response.data);
            setProdi(response.data.result);
        })
    }, [])

    return (
        <div>
            <h2>List Program Studi</h2>
            <table className="table table-striped table-hover">
                <thead> 
                    <tr>
                        <th>Nama Prodi</th>
                        <th>Nama Fakultas</th>
                    </tr>
                </thead>
                <tbody>
                {prodi.map( (data) => (
                    <tr key={data.id}>
                        <td>{data.nama}</td>
                        <td>{data.fakultas.nama}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}