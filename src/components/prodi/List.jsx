import React, {useEffect, useState} from "react"
import axios from "axios"
import { NavLink } from "react-router-dom"

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
                <NavLink to="/prodi/create" className="btn btn-primary mb-3">
                    Tambah
                </NavLink>
            <table className="table table-striped table-hover">
                <thead> 
                    <tr>
                        <th>Nama Prodi</th>
                        <th>Nama Fakultas</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                {prodi.map( (data) => (
                    <tr key={data.id}>
                        <td>{data.nama}</td>
                        <td>{data.fakultas.nama}</td>
                        <td>
                        <button onClick={ () => handleDelete(data.id, data.nama)} className="btn btn-danger btn-sm">
                            Hapus
                            </button>
                            <NavLink to={`/Prodi/edit/${data.id}`} className="btn btn-warning btn-sm">Ubah</NavLink>
                            </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}