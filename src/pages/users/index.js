import React, { useEffect, useState } from 'react'
import { getUsers, deleteUser } from '../../api/users';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { Delete, Edit } from "@mui/icons-material";
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Layout } from "../../layout/layout";
import { Sidebar } from '../../layout/sideBar';
import { Navbar } from '../../layout/navBar';

function Users() {
  const [listUsers, setListUsers] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    getUsers()
      .then((response) => {
        setListUsers(response.data.filter((user) => user.role !== "ADMIN"))
        console.log(response.data)
      })
      .catch((error) => (
        console.error(error)
      ))
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setListUsers(listUsers.filter((user) => user._id !== id));
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
        <Typography sx={{ m: 1, margin: '1rem' }} variant="h4">
          Chauffeurs
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              navigate("add");
            }}>
            Add new user
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Matricule</TableCell>
              <TableCell align="left">Nom et Prenom</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">CIN</TableCell>
              <TableCell align="left">Télephone</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listUsers.map((user) => (
              <TableRow
                key={user._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
               
                <TableCell align="left">{user.matricule}</TableCell>
                
                <TableCell align="left">{user.nom} {user.prenom}</TableCell>
                <TableCell align="left">{user.email}</TableCell>
                <TableCell align="left">{user.CIN}</TableCell>
                <TableCell align="left">{user.tel}</TableCell>
                <TableCell align="left">
                  <IconButton
                    aria-label="edit"
                    size="medium"
                    onClick={() => {
                      navigate(`/users/edit/${user._id}`)
                    }}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    size="medium"
                    onClick={async () => {
                      await handleDelete(user._id)
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
// Users.getLayout = (page) => <Layout>{page}</Layout>;

export default Users;