import './App.css';
import Login  from './pages/login';
import Vehicules from './pages/vehicules';
import Users from './pages/users';
<<<<<<< HEAD
import Missions from './pages/missions';

=======
import AddUser from './pages/users/add';
>>>>>>> 303a06e9e2c3b3696eb2a45ab04e6724d84dc048
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
          <Route path="/vehicules" element={<Vehicules/>}/>
          <Route path="/missions" element={<Missions/>}/>
        </Routes>
      </Router>
  );
}

export default App;
