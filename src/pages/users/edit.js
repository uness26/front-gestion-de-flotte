import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import { updateUser, getUserById } from '../../api/users';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getVehicules } from '../../api/vehicules';
import { getUsers } from '../../api/users';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Sidebar } from '../../layout/sideBar';
import { Navbar } from '../../layout/navBar';

export default function EditUser() {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const navigate = useNavigate();



    useEffect(() => {
        getUserById(id)
            .then((response) => {
                setUser(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
        console.log(user)
    }, [id]);

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
        console.log(user)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const body = {
            matricule: user.matricule,
            nom: user.nom,
            prenom: user.prenom,
            CIN: user.CIN,
            tel: user.tel,
            password: user.password,
            email: user.email,
        }
        updateUser(id, body)
            .then((res) => {
                console.log(res)
                navigate("/users")
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <Navbar />
            <Sidebar />
            <title> EditUser </title>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}>
                <Container maxWidth="lg">
                    <Typography sx={{ mb: 3 }} variant="h4">
                        Modifier 
                    </Typography>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <Card>
                            <Divider />
                            <CardContent>
                                <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                        <InputLabel id="label">Matricule</InputLabel>
                                        <TextField
                                            fullWidth
                                            name="matricule"
                                            onChange={handleChange}
                                            required
                                            value={user?.matricule}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <InputLabel id="label">Nom</InputLabel>
                                        <TextField
                                            fullWidth
                                            name="nom"
                                            onChange={handleChange}
                                            required
                                            value={user?.nom}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <InputLabel id="label">Prénom</InputLabel>
                                        <TextField
                                            fullWidth
                                            name="prenom"
                                            onChange={handleChange}
                                            required
                                            value={user?.prenom}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <InputLabel id="label">Email</InputLabel>
                                        <TextField
                                            fullWidth
                                            name="email"
                                            onChange={handleChange}
                                            required
                                            value={user?.email}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <InputLabel id="label">CIN</InputLabel>
                                        <TextField
                                            labelId="label"
                                            name="CIN"
                                            fullWidth
                                            type="number"
                                            onChange={handleChange}
                                            value={user?.CIN}
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <InputLabel id="label">Télephone</InputLabel>
                                        <TextField
                                            fullWidth
                                            name="tel"
                                            type="number"
                                            onChange={handleChange}
                                            required
                                            value={user.tel}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <InputLabel id="label">Mot de passe</InputLabel>
                                        <TextField
                                            fullWidth
                                            name="password"
                                            type="password"
                                            onChange={handleChange}
                                            required
                                            value={user.password}
                                            variant="outlined"
                                        />
                                    </Grid>

                                </Grid>
                            </CardContent>
                            <Divider />
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    p: 2,
                                }}
                            >
                                <Button color="primary" variant="contained" type="submit" onClick={handleSubmit}>
                                    Save
                                </Button>
                            </Box>
                        </Card>
                    </form>
                </Container>
            </Box>
        </>
    )
}


