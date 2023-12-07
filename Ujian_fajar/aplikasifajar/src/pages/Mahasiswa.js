import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class Mahasiswa extends Component {
    state = {
       mahasiswa: [],
       loading: true, 
    }
    async componentDidMount(){
        const res =  await axios.get('http://127.0.0.1:8000/api/mahasiswa');
        if(res.data.status === 200){
            this.setState({
                mahasiswa: res.data.mahasiswa,
                loading: false,
            });

        }
    }
    deleteMhs = async (e, id) => {
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Sedang Menghapus";
        const res = await axios.delete(`http://127.0.0.1:8000/api/delete-mhs/${id}`);
        if(res.data.status === 200){
            thisClicked.closest("tr").remove();
            swal({
                title: "Berhasil Dihapus",
                text: res.data.message,
                icon: "success",
                button: "Ok",
            });


        }
    }

    render() {
        var tabel_mahasiswa="";
        if(this.state.loading){
            tabel_mahasiswa = <tr><td colSpan="7"><h2>Sedang Memuat...</h2></td></tr> 

        }else{
            tabel_mahasiswa = 
            this.state.mahasiswa.map((item) => {
                return(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nama}</td>
                        <td>{item.npm}</td>
                        <td>{item.kelas}</td>
                        <td>{item.bahasa}</td>
                        <td>
                            <Link to={`edit-mhs/${item.id}`} className="btn btn-success btn-sm">Ubah</Link>
                        </td>
                        <td>
                            <button type="button" onClick={e => this.deleteMhs(e, item.id)} className="btn btn-danger btn-sm">Hapus</button>
                        </td>
                    </tr>
                );
            });

        }
        return (
            <div className="container">
                <h2>Daftar Peserta Lomba Coding</h2>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Data Mahasiswa
                                    <Link to={'add-mhs'} className="btn btn-primary btn-sm float-end">Tambah Mahasiswa</Link>
                                </h4>
                            </div>
                            <div className="card-body">

                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nama Mahasiswa</th>
                                            <th>NPM</th>
                                            <th>Kelas</th>
                                            <th>Bahasa Pemrograman</th>
                                            <th>Ubah</th>
                                            <th>Hapus</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tabel_mahasiswa}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

}
export default Mahasiswa;