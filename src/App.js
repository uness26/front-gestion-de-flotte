import './App.css';
import Login  from './pages/login';
import Vehicules from './pages/vehicules';
import Users from './pages/users';
import Missions from './pages/missions';
import Reclamations from './pages/reclamations';
import AddUser from './pages/users/add';
import EditUser from './pages/users/edit';
import AddVehicule from './pages/vehicules/add';
import AddMission from './pages/missions/add';
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
          <Route path="/vehicules/add" element={<AddVehicule/>}/>
          <Route path="/missions" element={<Missions/>}/>
          <Route path="/missions/add" element={<AddMission/>}/>
          <Route path="/reclamations" element={<Reclamations/>}/>
        </Routes>
      </Router>
  );
}

export default App;
