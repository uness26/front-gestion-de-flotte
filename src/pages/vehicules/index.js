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

export default function Vehicules() {
  const [listVehicules, setListVehicules] = useState([]);
  const navigate = useNavigate()

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
      setListVehicules(listVehicules.filter((vehicule) => vehicule.id !== id));
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
          Vehicules
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              navigate("/vehicules/add");
            }}>
            Add new vehicule
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
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Marque</TableCell>
              <TableCell align="right">Immatricule</TableCell>
              <TableCell align="right">Volume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listVehicules.map((vehicule) => (
              <TableRow
                key={vehicule._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell padding="checkbox">
                  <Checkbox
                    value="true"
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {vehicule._id}
                </TableCell>
                <TableCell align="right">{vehicule.type}</TableCell>
                <TableCell align="right">{vehicule.marque}</TableCell>
                <TableCell align="right">{vehicule.immatricule}</TableCell>
                <TableCell align="right">{vehicule.volume}</TableCell>
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
                    onClick={async () => {
                      await handleDelete(vehicule.id)
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