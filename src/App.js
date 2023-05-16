import './App.css';
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { styled } from '@mui/material/styles';
import { theme } from "./theme";
import Login from './pages/login';
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
import { Sidebar } from './layout/sideBar';
import { Navbar } from './layout/navBar';
import Account from './pages/account';
import EditMission from './pages/missions/edit';

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDE_NAV_WIDTH
  }
}));

const LayoutContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '98%',
  margin: '1rem',
});

function App() {

  return (
    <LayoutRoot>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Sidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8,
            }}>

            <LayoutContainer>
              <Routes>
                <Route path='/account' element={<Account />} />
                <Route path="/" element={<Login />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/add" element={<AddUser />} />
                <Route path='/users/edit/:id' element={<EditUser />} />
                <Route path="/vehicules" element={<Vehicules />} />
                <Route path="/vehicules/add" element={<AddVehicule />} />
                <Route path="/missions" element={<Missions />} />
                <Route path="/missions/edit/:id" element={<EditMission />} />
                <Route path="/missions/add" element={<AddMission />} />
                <Route path="/reclamations" element={<Reclamations />} />
              </Routes>
            </LayoutContainer>
          </Box>
        </Router>
      </ThemeProvider>
    </LayoutRoot>
  );

}

export default App;
