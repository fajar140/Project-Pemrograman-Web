import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class EditMhs extends Component {
    state = {
        nama: '',
        npm: '',
        kelas: '',
        bahasa: '',
        error_list: {},
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async componentDidMount() {
        const mhs_id = this.props.match.params.id;
        const res = await axios.get(`http://127.0.0.1:8000/api/edit-mhs/${mhs_id}`);
        if (res.data.status === 200) {
            this.setState({
                nama: res.data.mahasiswa.nama,
                npm: res.data.mahasiswa.npm,
                kelas: res.data.mahasiswa.kelas,
                bahasa: res.data.mahasiswa.bahasa,
            });
        }
    }

    updateMhs = async (e) => {
        e.preventDefault();
        const updateBtn = document.getElementById('updatebtn');
        updateBtn.disabled = true;
        updateBtn.innerText = "Sedang Memperbarui";
    
        const mhs_id = this.props.match.params.id;
        const res = await axios.put(`http://127.0.0.1:8000/api/update-mhs/${mhs_id}`, this.state);
    
        if (res.data.status === 200) {
            swal({
                title: "Berhasil Diubah",
                text: res.data.message,
                icon: "success",
                button: "Ok",
            });
    
            // Reset the button state after a successful update
            updateBtn.disabled = false;
            updateBtn.innerText = "Simpan";
        } else if (res.data.status === 422) {
            // Validation errors
            this.setState({
                error_list: res.data.validate_err,
            });
    
            // Display validation errors using SweetAlert
            swal({
                title: "Terjadi Kesalahan",
                text: "Silakan periksa kembali isian form.",
                icon: "warning",
                button: "Ok",
            });
    
            // Reset the button state in case of validation errors
            updateBtn.disabled = false;
            updateBtn.innerText = "Simpan";
        } else if (res.data.status === 404) {
            // Data not found error
            swal({
                title: "Terjadi Kesalahan",
                text: res.data.message,
                icon: "warning",
                button: "Ok",
            });
    
            // Reset the button state in case of errors
            updateBtn.disabled = false;
            updateBtn.innerText = "Simpan";
        } else {
            // Other errors
            swal({
                title: "Terjadi Kesalahan",
                text: "Gagal memperbarui data. Silakan coba lagi.",
                icon: "error",
                button: "Ok",
            });
    
            // Reset the button state in case of errors
            updateBtn.disabled = false;
            updateBtn.innerText = "Simpan";
        }
    }
    updateMhs = async (e) => {
        e.preventDefault();
        const updateBtn = document.getElementById('updatebtn');
        updateBtn.disabled = true;
        updateBtn.innerText = "Sedang Memperbarui";
    
        const mhs_id = this.props.match.params.id;
        const res = await axios.put(`http://127.0.0.1:8000/api/update-mhs/${mhs_id}`, this.state);
    
        if (res.data.status === 200) {
            swal({
                title: "Berhasil Diubah",
                text: res.data.message,
                icon: "success",
                button: "Ok",
            });
    
            // Reset the button state after a successful update
            updateBtn.disabled = false;
            updateBtn.innerText = "Simpan";
        } else if (res.data.status === 422) {
            // Validation errors
            this.setState({
                error_list: res.data.validate_err,
            });
    
            // Display validation errors using SweetAlert
            swal({
                title: "Terjadi Kesalahan",
                text: "Silakan periksa kembali isian form.",
                icon: "warning",
                button: "Ok",
            });
    
            // Reset the button state in case of validation errors
            updateBtn.disabled = false;
            updateBtn.innerText = "Simpan";
        } else if (res.data.status === 404) {
            // Data not found error
            swal({
                title: "Terjadi Kesalahan",
                text: res.data.message,
                icon: "warning",
                button: "Ok",
            });
    
            // Reset the button state in case of errors
            updateBtn.disabled = false;
            updateBtn.innerText = "Simpan";
        } else {
            // Other errors
            swal({
                title: "Terjadi Kesalahan",
                text: "Gagal memperbarui data. Silakan coba lagi.",
                icon: "error",
                button: "Ok",
            });
    
            // Reset the button state in case of errors
            updateBtn.disabled = false;
            updateBtn.innerText = "Simpan";
        }
    }
        
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
