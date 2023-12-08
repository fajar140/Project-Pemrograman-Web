import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Mahasiswa from './pages/Mahasiswa';
import AddMhs from './pages/AddMhs';
import EditMhs from './pages/EditMhs';

// Komponen utama React yang menangani konfigurasi rute dalam aplikasi
function App() {
  return (

        <Router>
          {/* Komponen Switch digunakan untuk mencocokkan dan menampilkan satu rute pada satu waktu */}
          <Switch>
            {/* Rute untuk menampilkan semua data mahasiswa */}
            <Route exact path="/" component={Mahasiswa}/>
            {/* Rute untuk menampilkan halaman penambahan data mahasiswa */}
            <Route path="/add-mhs" component={AddMhs} />
            {/* Rute untuk menampilkan halaman pengeditan data mahasiswa berdasarkan ID */}
            <Route path="/edit-mhs/:id" component={EditMhs} />


          </Switch>
        </Router>

  );
}

// Ekspor komponen App untuk digunakan di aplikasi React
export default App;
