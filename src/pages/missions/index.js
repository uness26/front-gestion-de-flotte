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
      setListMissions(listMissions.filter((mission) => mission.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
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
              //navigate("/addCutomer");
            }}>
            Add new mission
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell> ID</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Lieu de départ</TableCell>
              <TableCell align="right">Lieu d'arrivée</TableCell>
              <TableCell align="right">Etat</TableCell>
              <TableCell align="right">Chauffeur</TableCell>
              <TableCell align="right">Véhicule</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listMissions.map((mission) => (
              <TableRow
                key={mission._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell padding="checkbox">
                  <Checkbox
                    value="true"
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {mission._id}
                </TableCell>
                <TableCell align="right">{mission.date}</TableCell>
                <TableCell align="right">{mission.lieuDep}</TableCell>
                <TableCell align="right">{mission.lieuArr}</TableCell>
                <TableCell align="right">{mission.etat}</TableCell>
                <TableCell align="right">{mission.chauffeur}</TableCell>
                <TableCell align="right">{mission.vehicule}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="edit"
                    size="medium"
                    onClick={() => {
                      const idMission = mission.id.toString()
                      //navigate(`/editMission/:${idMission}`)
                    }}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    size="medium"
                    onClick={async () => {
                      await handleDelete(mission.id)
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