import React, { useState, useEffect } from 'react'
import { Box, Container } from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { createMission } from "../../api/missions";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { getVehicules } from '../../api/vehicules';
import { getUsers } from '../../api/users';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Sidebar } from '../../layout/sideBar';
import { Navbar } from '../../layout/navBar';
import socket from "../../contexts/socket_manager"


export default function AddMission() {
    const navigate = useNavigate();
    const [vehicules, setVehicules] = useState([]);
    const [chauffeurs, setChaffeurs] = useState([]);
    const [mission, setMission] = useState({});


    useEffect(() => {
        getVehicules().then((response) => {
            setVehicules(response.data)
        })
            .catch((error) => (console.error(error)))
    }, [])

    useEffect(() => {
        getUsers().then((response) => {
            setChaffeurs(response.data.filter((user) => user.role !== 'ADMIN'))
        })
            .catch((error) => (console.error(error)))
    }, [])



    const handleChangeDate = (newDate) => {

        setMission({
            ...mission,
            date: newDate
        })
    };

    const handleChangeTime = (newTime) => {
        setMission({
            ...mission,
            heureDep: newTime
        })
    };

    const handleChange = (event) => {
        setMission({
            ...mission,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        createMission(mission)
            .then((res) => {
                console.log(res);
                navigate("/missions");
                socket.emit("addMission", mission)
            })
            .catch((err) => console.log(err));
    };

    return (
        <>

            <title>
                Missions
            </title>
            <Navbar />
            <Sidebar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}>
                <Container maxWidth="lg">
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <Card>
                            <CardHeader title="Ajouter une mission" />
                            <Divider />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item md={6} xs={12}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                                            <DatePicker
                                                label="Date"
                                                format="DD/MM/YYYY"
                                                name="date"
                                                required
                                                onChange={handleChangeDate}
                                                fullWidth
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                                            <TimePicker
                                                label="Heure de départ"
                                                format="hh:mm"
                                                name="heureDep"
                                                ampm={false}
                                                required
                                                onChange={handleChangeTime}
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Lieu de départ"
                                            name="lieuDep"
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Lieu d'arrivée"
                                            name="lieuArr"
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <InputLabel id="label">Chauffeur</InputLabel>
                                        <Select
                                            labelId="label"
                                            id="select"
                                            name="chauffeur"
                                            fullWidth
                                            onChange={handleChange}
                                            label="Chauffeur"
                                        >
                                            {chauffeurs?.map((chauffeur) => (
                                                <MenuItem value={chauffeur?._id}>{chauffeur?.nom} {chauffeur?.prenom}</MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <InputLabel id="label">Vehicule</InputLabel>
                                        <Select
                                            labelId="label"
                                            id="select"
                                            name="vehicule"
                                            fullWidth
                                            onChange={handleChange}
                                            label="Vehicule"
                                        >
                                            {vehicules?.map((vehicule) => (
                                                <MenuItem value={vehicule?._id}>{vehicule?.type} {vehicule?.marque} </MenuItem>
                                            ))}
                                        </Select>
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