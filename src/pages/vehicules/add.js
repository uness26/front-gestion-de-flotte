import React, { useState } from 'react'
import { Box, Container, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { createVehicule } from "../../api/vehicules";
import { Sidebar } from '../../layout/sideBar';
import { Navbar } from '../../layout/navBar';

export default function AddVehicule() {
    const navigate = useNavigate();
    const [vehicule, setVehicule] = useState({});

    const handleChange = (event) => {
        setVehicule({
            ...vehicule,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(vehicule)
        createVehicule(vehicule)
            .then((res) => {
                console.log(res);
                navigate("/vehicules");
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
                            <CardHeader title="Ajouter une véhicule" />
                            <Divider />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Type"
                                            name="type"
                                            onChange={handleChange}
                                            required
                                            value={vehicule.type}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Marque"
                                            name="marque"
                                            onChange={handleChange}
                                            required
                                            value={vehicule.Marque}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Immatricule"
                                            name="immatricule"
                                            onChange={handleChange}
                                            required
                                            value={vehicule.immatricule}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Volume"
                                            name="volume"
                                            onChange={handleChange}
                                            required
                                            value={vehicule.volume}
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
                                    Enregistrer
                                </Button>
                            </Box>
                        </Card>
                    </form>
                </Container>
            </Box>
        </>
    )
}