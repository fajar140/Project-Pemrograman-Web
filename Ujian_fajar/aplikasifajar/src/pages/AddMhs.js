import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

// Komponen AddMhs sebagai kelas komponen React
class AddMhs extends Component {
    // State untuk menyimpan data yang akan ditambahkan, dan pesan kesalahan validasi
    state = {
       nama: '', 
       npm: '', 
       kelas: '', 
       bahasa: '', 
       error_list:[],
    }
    // Metode untuk meng-handle perubahan input pada form
    handleInput = (e) => {
        this.setState({
           [e.target.name]: e.target.value
        });
    }
    // Metode untuk menyimpan data mahasiswa baru
    saveMhs = async (e) => {
        // Menghentikan perilaku bawaan form
        e.preventDefault();
        // Mengirim permintaan POST ke API untuk menambahkan data mahasiswa
        const res = await axios.post('http://127.0.0.1:8000/api/add-mhs', this.state);
        // Menangani respons dari API
        if(res.data.status === 200){
            // Menampilkan pesan sukses jika berhasil
            swal({
                title: "Berhasil",
                text: res.data.message,
                icon: "success",
                button: "Ok",
            });
            // Mereset state untuk menyiapkan form tambah mahasiswa yang baru
            this.setState({
                nama: '', 
                npm: '', 
                kelas: '', 
                bahasa: '', 
                error_list: [], // Mengosongkan pesan kesalahan validasi
            });
        } else{
            // Menangani kesalahan validasi
           this.setState({
            error_list: res.data.validate_err
           }); 
        }
    }
    // Metode untuk merender tampilan komponen AddMhs
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="card-header">
                                <h4>Tambah Mahasiswa Baru
                                    <Link to={'/'} className="btn btn-primary btn-sm float-end">Kembali</Link>
                                </h4>
                            </div>
                            <div className="card-body"> 
                                <form onSubmit={this.saveMhs}>
                                    <div className="form-group mb-3">
                                        <label>Nama Mahasiswa</label>
                                        <input type="text" name="nama" onChange={this.handleInput} value={this.state.nama} className='form-control'/>
                                        <span className="text-danger">{this.state.error_list.nama}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Nomor Pokok Mahasiswa</label>
                                        <input type="text" name="npm" onChange={this.handleInput} value={this.state.npm} className='form-control'/>
                                        <span className="text-danger">{this.state.error_list.npm}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Kelas</label>
                                        <input type="text" name="kelas" onChange={this.handleInput} value={this.state.kelas} className='form-control'/>
                                        <span className="text-danger">{this.state.error_list.kelas}</span>

                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Bahasa Pemrograman</label>
                                        <input type="text" name="bahasa" onChange={this.handleInput} value={this.state.bahasa} className='form-control'/>
                                        <span className="text-danger">{this.state.error_list.bahasa}</span>

                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="kirim" className='btn btn-primary'>Kirim</button>
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
export default AddMhs;