import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

// Komponen EditMhs sebagai kelas komponen React
class EditMhs extends Component {
    // State untuk menyimpan data yang akan diubah, pesan kesalahan, dan status tombol
    state = {
        nama: '',
        npm: '',
        kelas: '',
        bahasa: '',
        error_list: {},
    }

    // Metode untuk meng-handle perubahan input pada form
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    // Metode yang dipanggil setelah komponen dipasang
    async componentDidMount() {
        // Mendapatkan ID mahasiswa dari parameter URL
        const mhs_id = this.props.match.params.id;
        // Mengirim permintaan GET ke API untuk mendapatkan data mahasiswa berdasarkan ID
        const res = await axios.get(`http://127.0.0.1:8000/api/edit-mhs/${mhs_id}`);
        // Jika status respons adalah 200, mengisi state dengan data mahasiswa
        if (res.data.status === 200) {
            this.setState({
                nama: res.data.mahasiswa.nama,
                npm: res.data.mahasiswa.npm,
                kelas: res.data.mahasiswa.kelas,
                bahasa: res.data.mahasiswa.bahasa,
            });
        }
    }
    // Metode untuk meng-update data mahasiswa
    updateMhs = async (e) => {
        // Menghentikan perilaku bawaan form
        e.preventDefault();
        // Mendapatkan elemen tombol Simpan
        const updateBtn = document.getElementById('updatebtn');
        // Menonaktifkan tombol dan mengubah teksnya saat sedang memperbarui data
        updateBtn.disabled = true;
        updateBtn.innerText = "Sedang Memperbarui";
        
        // Mendapatkan ID mahasiswa dari parameter URL
        const mhs_id = this.props.match.params.id;
        // Mengirim permintaan PUT ke API untuk memperbarui data mahasiswa
        const res = await axios.put(`http://127.0.0.1:8000/api/update-mhs/${mhs_id}`, this.state);
        // Menangani respons dari API
        if (res.data.status === 200) {
            // Menampilkan pesan sukses jika berhasil
            swal({
                title: "Berhasil Diubah",
                text: res.data.message,
                icon: "success",
                button: "Ok",
            });
    
            // Mengaktifkan kembali tombol dan mengembalikan teksnya setelah sukses
            updateBtn.disabled = false;
            updateBtn.innerText = "Simpan";
        } else if (res.data.status === 422) {
            // Menangani kesalahan validasi
            this.setState({
                error_list: res.data.validate_err,
            });
    
            // Menampilkan pesan validasi menggunakan SweetAlert
            swal({
                title: "Terjadi Kesalahan",
                text: "Silakan periksa kembali isian form.",
                icon: "warning",
                button: "Ok",
            });
    
            // Mengaktifkan kembali tombol setelah terjadi kesalahan validasi
            updateBtn.disabled = false;
            updateBtn.innerText = "Simpan";
        } else if (res.data.status === 404) {
            // Menangani kesalahan data tidak ditemukan
            swal({
                title: "Terjadi Kesalahan",
                text: res.data.message,
                icon: "warning",
                button: "Ok",
            });
    
            // Mengaktifkan kembali tombol setelah terjadi kesalahan
            updateBtn.disabled = false;
            updateBtn.innerText = "Simpan";
        } else {
            // Menangani kesalahan lainnya
            swal({
                title: "Terjadi Kesalahan",
                text: "Gagal memperbarui data. Silakan coba lagi.",
                icon: "error",
                button: "Ok",
            });
    
            // Mengaktifkan kembali tombol setelah terjadi kesalahan
            updateBtn.disabled = false;
            updateBtn.innerText = "Simpan";
        }
    }

    // Metode untuk merender tampilan komponen EditMhs    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="card-header">
                                <h4>Ubah Data Mahasiswa
                                    <Link to={'/'} className="btn btn-primary btn-sm float-end">Kembali</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.updateMhs}>
                                    <div className="form-group mb-3">
                                        <label>Nama Mahasiswa</label>
                                        <input type="text" name="nama" onChange={this.handleInput} value={this.state.nama} className='form-control' />
                                        <span className="text-danger">{this.state.error_list.nama}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Nomor Pokok Mahasiswa</label>
                                        <input type="text" name="npm" onChange={this.handleInput} value={this.state.npm} className='form-control' />
                                        <span className="text-danger">{this.state.error_list.npm}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Kelas</label>
                                        <input type="text" name="kelas" onChange={this.handleInput} value={this.state.kelas} className='form-control' />
                                        <span className="text-danger">{this.state.error_list.kelas}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Bahasa Pemrograman</label>
                                        <input type="text" name="bahasa" onChange={this.handleInput} value={this.state.bahasa} className='form-control' />
                                        <span className="text-danger">{this.state.error_list.bahasa}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" id="updatebtn" className='btn btn-primary'>Simpan</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditMhs;
