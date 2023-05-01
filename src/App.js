import './App.css';
import Login  from './pages/login';
import Vehicules from './pages/vehicules';
import Users from './pages/users';
import AddUser from './pages/users/add';
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
        </Routes>
      </Router>
  );
}

export default App;
