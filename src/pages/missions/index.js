import React, { useEffect, useState } from 'react'
import { getMissions, deleteMission } from '../../api/missions';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { Delete, Edit } from "@mui/icons-material";
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../layout/sideBar';
import { Navbar } from '../../layout/navBar';

export default function Missions() {
  const [listMissions, setListMissions] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    getMissions()   
      .then((response) => {
        setListMissions(response.data)
        console.log(response.data)
      })
      .catch((error) => (
        console.error(error)
      ))
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteMission(id);
      setListMissions(listMissions.filter((mission) => mission._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <Navbar />
    <Sidebar />
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Missions
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              navigate("/missions/add");
            }}> 
            Add new mission
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Etat</TableCell>
              <TableCell align="left">Lieu de départ</TableCell>
              <TableCell align="left">Lieu d'arrivée</TableCell>
              <TableCell align="left">Heure de départ</TableCell>
              <TableCell align="left">Heure d'arrivée</TableCell>
              <TableCell align="left">Chauffeur</TableCell>
              <TableCell align="left">Véhicule</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listMissions.map((mission) => (
              <TableRow
                key={mission._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }  }}>
                
                <TableCell align="left" width={100}>{mission.date}</TableCell>
                <TableCell align="left">{mission.etat}</TableCell>
                <TableCell align="left">{mission.lieuDep}</TableCell>
                <TableCell align="left">{mission.lieuArr}</TableCell>
                <TableCell align="left">{mission.heureDep}</TableCell>
                <TableCell align="left">{mission.heureArr}</TableCell>
                <TableCell align="left">{mission.chauffeur?.nom} {mission.chauffeur?.prenom}</TableCell>
                <TableCell align="left">{mission?.vehicule?.type} {mission.vehicule?.marque}</TableCell>
                <TableCell align="left">
                  <IconButton
                    aria-label="edit"
                    size="medium"
                    onClick={() => {
                      navigate(`/missions/edit/${mission._id}`)
                    }}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    size="medium"
                    onClick={async () => {
                      await handleDelete(mission._id)
                    }}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}