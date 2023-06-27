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
import EditVehicule from './pages/vehicules/edit';
import AddMission from './pages/missions/add';
import NotFound from './pages/404';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Account from './pages/account';
import EditMission from './pages/missions/edit';
import { AuthProvider } from './contexts/auth';
import { Protected } from "./pages/protected";

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
          <AuthProvider>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                py: 8,
              }}>

              <LayoutContainer>
                <Routes>
                  <Route path="/" element={<Login />} />

                  <Route path='/account' element={
                    <Protected>
                      <Account />
                    </Protected>
                  } />

                  <Route path="/users" element={
                    <Protected>
                      <Users />
                    </Protected>
                  } />
                  <Route path="/users/add" element={
                    <Protected>
                      <AddUser />
                    </Protected>
                  } />
                  <Route path='/users/edit/:id' element={
                    <Protected>
                      <EditUser />
                    </Protected>
                  } />
                  <Route path="/vehicules" element={
                    <Protected>
                      <Vehicules />
                    </Protected>
                  } />
                  <Route path="/vehicules/add" element={
                    <Protected>
                      <AddVehicule />
                    </Protected>
                  } />
                  <Route path="/vehicules/edit/:id" element={
                    <Protected>
                      <EditVehicule />
                    </Protected>
                  } />
                  <Route path="/missions" element={
                    <Protected>
                      <Missions />
                    </Protected>
                  } />
                  <Route path="/missions/edit/:id" element={
                    <Protected>
                      <EditMission />
                    </Protected>
                  } />
                  <Route path="/missions/add" element={
                    <Protected>
                      <AddMission />
                    </Protected>
                  } />
                  <Route path="/reclamations" element={
                    <Protected>
                      <Reclamations />
                    </Protected>
                  } />
                  <Route path="*" element={
                    <Protected>
                      <NotFound />
                    </Protected>
                  } />
                </Routes>

              </LayoutContainer>
            </Box>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </LayoutRoot>
  );

}

export default App;
