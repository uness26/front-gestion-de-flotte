import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import { updateVehicule, getVehiculeById } from '../../api/vehicules';
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
import { Sidebar } from '../../layout/sideBar';
import { Navbar } from '../../layout/navBar';


export default function EditUser() {
    const { id } = useParams();
    const [vehicule, setVehicule] = useState({});
    const navigate = useNavigate();



    useEffect(() => {
        getVehiculeById(id)
            .then((response) => {
                setVehicule(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [id]);

    const handleChange = (event) => {
        setVehicule({
            ...vehicule,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const body = {
            type: vehicule.type,
            marque: vehicule.marque,
            immatricule: vehicule.immatricule,
            volume: vehicule.volume
        }
        updateVehicule(id, body)
            .then((res) => {
                console.log(res)
                navigate("/vehicules")
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <Navbar />
            <Sidebar />
            <title> Véhicules </title>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}>
                <Container maxWidth="lg">
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <Card>
                            <CardHeader title="Modifier cette véhicule" />
                            <Divider />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item md={6} xs={12}>
                                        <InputLabel id="label">Type</InputLabel>
                                        <TextField
                                            fullWidth
                                            name="type"
                                            onChange={handleChange}
                                            required
                                            value={vehicule?.type}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <InputLabel id="label">Marque</InputLabel>
                                        <TextField
                                            fullWidth
                                            name="marque"
                                            onChange={handleChange}
                                            required
                                            value={vehicule?.marque}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <InputLabel id="label">Immatricule</InputLabel>
                                        <TextField
                                            fullWidth
                                            name="immatricule"
                                            onChange={handleChange}
                                            required
                                            value={vehicule?.immatricule}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <InputLabel id="label">Volume</InputLabel>
                                        <TextField
                                            name="volume"
                                            fullWidth
                                            required
                                            onChange={handleChange}
                                            value={vehicule?.volume}
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
                                    Mettre à jour
                                </Button>
                            </Box>
                        </Card>
                    </form>
                </Container>
            </Box>
        </>
    )
}