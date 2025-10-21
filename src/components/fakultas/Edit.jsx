// src/components/Fakultas/Create.jsx
import React, { useState } from "react"; // Import React dan useState untuk menggunakan state hooks 
import axios from "axios"; // Import axios untuk melakukan HTTP request
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function EditFakultas() {
    const {id} = useParams();
    const navigate = useNavigate();
    // Inisialisasi state untuk menyimpan nama fakultas 
    const [nama, setNamaFakultas] = useState(""); 
    // Inisialisasi state untuk menyimpan pesan error 
    const [error, setError] = useState("");
    // Inisialisasi state untuk menyimpan pesan sukses 
    const [success, setSuccess] = useState("");

    useEffect( ()=> {
        axios
        .get(`https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`) 
        .then( (response) => {
            console.log(response.data);
            setNamaFakultas(response.data.result.nama);
        })
        .catch( (error) => {
            setError("Failed to fetch fakultas data");
        });

    }, [id]);

    // Fungsi yang akan dijalankan saat form disubmit 
    const handleSubmit= async (e) => {
        e.preventDefault(); // Mencegah reload halaman setelah form disubmit 
        setError(""); // Reset pesan error sebelum proses
        setSuccess(""); // Reset pesan sukses sebelum proses
        
        // Validasi input: jika nama Fakultas kosong, set pesan error
        if (nama.trim() === "") {
        setError("Nama Fakultas is required"); // Set pesan error jika input kosong 
        return; // Stop eksekusi fungsi jika input tidak valid
        }
        try{
        //Melakukan HTTP POST request untuk menyimpan data fakultas
        const response = await axios.patch(
            `https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`, //Endpoint API yang dituju
            {
                nama: nama,
            }
        ).catch( (error) => {
            setError(error.response.data.message);
        });

        if(response.status === 200) {
            Swal.fire({
                title: "Success!",
                text: "Fakultas updated successfully.",
                icon: "success"
            })
            navigate("/fakultas");
            // setSuccess("Fakultas updated successfully!");
            // setNamaFakultas("");
        } else{
            setError("Failed to update fakultas");
        }
        }catch(error){
            setError("An error occurred while creating fakultas");
        }
    };

    return(
        <div className="container mt-5">
            <h2 className="mb-4">Edit Fakultas</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nama" className="form-label">
                        Nama Fakultas
                    </label>
                    <input type="text" className="form-control" id="nama" value={nama} onChange={(e) => setNamaFakultas(e.target.value)} placeholder="Enter Fakultas Name" />
                </div>  
                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </form>
        </div>
    );
}