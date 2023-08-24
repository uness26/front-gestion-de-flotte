import React, { useEffect, useState } from 'react'
import { getReclamations, deleteReclamation, updateReclamation } from '../../api/reclamations';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { Delete, Edit } from "@mui/icons-material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Sidebar } from '../../layout/sideBar';
import { Navbar } from '../../layout/navBar';
import MenuItem from '@mui/material/MenuItem';
import socket from "../../contexts/socket_manager"
import Menu from '@mui/material/Menu';
import SearchBar from '../../layout/searchBar'
import ConfirmationDialog from '../../layout/confirmation_card';



export default function Reclamations() {
  const [listReclamations, setListReclamations] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [selectedReclamation, setReclamation] = useState();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleShowConfirmation = (id) => {
    setSelectedId(id);
    setShowConfirmation(true);
  };

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

  const handleClick = (event, id) => {
    setReclamation(listReclamations.find(reclamation => reclamation._id === id));
    console.log(selectedReclamation)
    setAnchorEl(event.currentTarget);
  };

  const handleEtatUpdate = (id, newEtat) => {
    const body = {
      etat: newEtat,
    }
    updateReclamation(id, body)
      .then((res) => {
        console.log(res)
        setListReclamations((prevReclamations) =>
          prevReclamations.map((reclamation) => {
            if (reclamation._id === id) {
              return { ...reclamation, etat: newEtat };
            }
            return reclamation;
          })
        );
        setAnchorEl(null);
        socket.emit("editEtat", { selectedReclamation, newEtat })
      })
      .catch((err) => console.log(err));
  };

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
      <title>
        Réclamations
      </title>
      <Navbar />
      <Sidebar />
      <Box
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          m: -1,
        }}
      >
        <SearchBar />
        <Typography sx={{ m: 3 }} variant="h4">
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
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listReclamations.map((reclamation) => (
              <TableRow
                key={reclamation._id}
              >

                <TableCell align="left">{reclamation.type}</TableCell>
                <TableCell align="left">{reclamation.date}</TableCell>
                <TableCell align="left" >{reclamation.description}</TableCell>
                <TableCell align="left">{reclamation.etat}  <Button
                  id="demo-positioned-button"
                  aria-controls={open ? 'demo-positioned-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={(event) => handleClick(event, reclamation._id)}
                >
                  <Edit />
                </Button>
                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  >
                    <MenuItem onClick={() => handleEtatUpdate(selectedReclamation._id, 'En Cour')}>En Cour</MenuItem>
                    <MenuItem onClick={() => handleEtatUpdate(selectedReclamation._id, 'Traitée')}>Traitée</MenuItem>
                    <MenuItem onClick={() => handleEtatUpdate(selectedReclamation._id, 'Annulée')}>Annullée</MenuItem>
                  </Menu>
                </TableCell>
                <TableCell align="left">{reclamation.chauffeur?.nom} {reclamation.chauffeur?.prenom}</TableCell>
                <TableCell align="left">
                  <IconButton
                    aria-label="delete"
                    size="medium"
                    onClick={() => handleShowConfirmation(reclamation._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer >

      <ConfirmationDialog
        open={showConfirmation}
        title="reclamation"
        message="cette reclamation"
        onClose={() => setShowConfirmation(false)}
        onConfirm={async () => {
          await handleDelete(selectedId);
          setShowConfirmation(false);
        }}
      />

    </>
  )
}