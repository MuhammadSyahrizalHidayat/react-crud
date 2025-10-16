import React, {useEffect, useState} from "react"
import axios from "axios"
import { data, NavLink } from "react-router-dom"
import Swal from "sweetalert2"

export default function List() {

    // state fakultas untuk menyimpan data response API Fakultas
    const [fakultas, setFakultas] = useState([])

    // panggil API Fakultas menggunakan useEffect dan axios
    useEffect( ()=> {
        axios
        .get("https://project-apiif-3-b.vercel.app/api/api/fakultas")
        .then( (response) => {
            console.log(response.data);
            setFakultas(response.data.result);
        })
    }, [])

    //Fungsi untuk menghapus fakultas
    const handleDelete = (id, nama) =>{
        Swal.fire({
        title: "Periksa Kembali",
        text: `Apakah Kamu yakin ingin menghapus data ${nama}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
        }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`)
            .then((response) => {
                setFakultas(fakultas.filter((data) => data.id !==id))
                Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
                });
            })
            .catch((error) => {
                Swal.fire({
                title: "Error!",
                text: `${error}`,
                icon: "warning"
                });
            })
        }
        });
    }

    return (
        <div>
            <h2>List Fakultas</h2>

            <NavLink to="/fakultas/create" className="btn btn-primary mb-3">
                Create
            </NavLink>

            <ul>
                {fakultas.map( (data) => (
                    <li key={data.id}>{data.nama}</li>
                ))}
            </ul>
        </div>
    )
}