import './App.css';
import Login  from './pages/login';
import Vehicules from './pages/vehicules';
import Users from './pages/users';
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
          <Route path="/vehicules" element={<Vehicules/>}/>
        </Routes>
      </Router>
  );
}

export default App;
