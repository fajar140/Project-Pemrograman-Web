import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Mahasiswa from './pages/Mahasiswa';
import AddMhs from './pages/AddMhs';
import EditMhs from './pages/EditMhs';


function App() {
  return (

        <Router>

          <Switch>
            <Route exact path="/" component={Mahasiswa}/>
            <Route path="/add-mhs" component={AddMhs} />
            <Route path="/edit-mhs/:id" component={EditMhs} />


          </Switch>
        </Router>

  );
}

export default App;
