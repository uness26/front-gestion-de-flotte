import React, { useEffect, useState } from 'react'
import { getReclamations, deleteReclamation } from '../../api/reclamations';
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

export default function Reclamations() {
  const [listReclamations, setListReclamations] = useState([]);
  
  const navigate = useNavigate()

  useEffect(() => {
    getReclamations()
      .then((response) => {
        setListReclamations(response.data)
        console.log(response.data)
      })
      .catch((error) => (
        console.error(error)
      ))
  }, [])



  const handleDelete = async (id) => {
    try {
      await deleteReclamation(id);
      setListReclamations(listReclamations.filter((reclamation) => reclamation._id !== id));
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
          Reclamations
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Etat</TableCell>
              <TableCell align="center">Chauffeur</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listReclamations.map((reclamation) => (
              <TableRow
                key={reclamation._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                <TableCell align="left">{reclamation.type}</TableCell>
                <TableCell align="left">{reclamation.date}</TableCell>
                <TableCell align="left">{reclamation.description}</TableCell>
                <TableCell align="left">{reclamation.etat}</TableCell>
                <TableCell align="left">{reclamation.chauffeur?.nom} {reclamation.chauffeur?.prenom}</TableCell>
                <TableCell align="left">
                  <IconButton
                    aria-label="edit"
                    size="medium"
                    onClick={() => {
                      navigate(`/reclamations/edit/${reclamation._id}`)
                    }}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    size="medium"
                    onClick={async () => {
                      await handleDelete(reclamation._id)
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