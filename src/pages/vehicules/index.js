import React, { useEffect, useState } from 'react'
import { getVehicules, deleteVehicule } from '../../api/vehicules';
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
import SearchBar from '../../layout/searchBar'
import ConfirmationDialog from '../../layout/confirmation_card';

export default function Vehicules() {
  const [listVehicules, setListVehicules] = useState([]);
  const navigate = useNavigate()
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleShowConfirmation = (id) => {
    setSelectedId(id);
    setShowConfirmation(true);
  };

  useEffect(() => {
    getVehicules()
      .then((response) => {
        setListVehicules(response.data)
        console.log(response.data)
      })
      .catch((error) => (
        console.error(error)
      ))
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteVehicule(id);
      setListVehicules(listVehicules.filter((vehicule) => vehicule._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <SearchBar />
      <title> Véhicules</title>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 3 }} variant="h4">
          Véhicules
        </Typography>
        <Box sx={{ m: 4 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              navigate("/vehicules/add");
            }}>
            Ajouter une véhicule
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Immatricule</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Marque</TableCell>
              <TableCell align="center">Volume</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listVehicules.map((vehicule) => (
              <TableRow
                key={vehicule._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left">{vehicule.immatricule}</TableCell>
                <TableCell align="left">{vehicule.type}</TableCell>
                <TableCell align="left">{vehicule.marque}</TableCell>
                <TableCell align="left">{vehicule.volume}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="edit"
                    size="medium"
                    onClick={() => {
                      navigate(`/vehicules/edit/${vehicule._id}`)
                    }}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    size="medium"
                    onClick={() => handleShowConfirmation(vehicule._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmationDialog
        open={showConfirmation}
        title="chauffeur"
        message="ce chauffeur"
        onClose={() => setShowConfirmation(false)}
        onConfirm={async () => {
          await handleDelete(selectedId);
          setShowConfirmation(false);
        }}
      />
    </>
  )
}