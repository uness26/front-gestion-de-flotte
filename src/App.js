import './App.css';
import Login  from './pages/login';
import Vehicules from './pages/vehicules';
import Users from './pages/users';
import Missions from './pages/missions';
import AddUser from './pages/users/add';
import EditUser from './pages/users/edit';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/users" element={<Users/>}/>
          <Route path="/users/add" element={<AddUser/>}/>
          <Route path='/users/edit/:id' element={<EditUser />} />
          <Route path="/vehicules" element={<Vehicules/>}/>
          <Route path="/missions" element={<Missions/>}/>
        </Routes>
      </Router>
  );
}

export default App;
