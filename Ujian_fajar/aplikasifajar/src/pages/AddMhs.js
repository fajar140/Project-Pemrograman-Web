import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class AddMhs extends Component {
    state = {
       nama: '', 
       npm: '', 
       kelas: '', 
       bahasa: '', 
       error_list:[],
    }

    handleInput = (e) => {
        this.setState({
           [e.target.name]: e.target.value
        });
    }

    saveMhs = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://127.0.0.1:8000/api/add-mhs', this.state);
        if(res.data.status === 200){
            swal({
                title: "Berhasil",
                text: res.data.message,
                icon: "success",
                button: "Ok",
            });
            this.setState({
                nama: '', 
                npm: '', 
                kelas: '', 
                bahasa: '', 
            });
        } else{
           this.setState({
            error_list: res.data.validate_err
           }); 
        }
    }
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