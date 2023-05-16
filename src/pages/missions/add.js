import React, { useState, useEffect } from 'react'
import { Box, Container, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { createMission } from "../../api/missions";
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getVehicules } from '../../api/vehicules';
import { getUsers } from '../../api/users';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function AddMission() {
    const navigate = useNavigate();
    const [vehicules, setVehicules] = useState([]);
    const [chauffeurs, setChaffeurs] = useState([]);
    const [mission, setMission] = useState({});
    const [date, setDate] = useState(
        dayjs('2014-08-18T21:11:54'),
    );

    useEffect(() => {
        getVehicules().then((response) => {
            setVehicules(response.data)
        })
            .catch((error) => (console.error(error)))
    }, [])

    useEffect(() => {
        getUsers().then((response) => {
            setChaffeurs(response.data.filter((user) => user.role !== 'ADMIN'))
            console.log(chauffeurs)
        })
            .catch((error) => (console.error(error)))
    }, [])

    useEffect(() => {
        setMission({
            ...mission,
            date: date,
        });
    }, [date])

    const handleChangeDate = (newValue) => {
        setDate(newValue)
        console.log(mission)
    };

    const handleChange = (event) => {
        setMission({
            ...mission,
            [event.target.name]: event.target.value
        });
        console.log(mission)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(mission)
        createMission(mission)
            .then((res) => {
                console.log(res);
                navigate("/missions");
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <title> AddMission </title>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}>
                <Container maxWidth="lg">
                    <Typography sx={{ mb: 3 }} variant="h4">
                        Add Mission
                    </Typography>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <Card>
                            <CardHeader subheader="The information can be edited" title="Mission" />
                            <Divider />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item md={6} xs={12}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                                            <DateField
                                                label="Date"
                                                inputFormat="dd/MM/yyyy"
                                                name="date"
                                                value={mission.date}
                                                required
                                                onChange={handleChangeDate}
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
                                            value={mission.lieuDep}
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
                                            value={mission.lieuArr}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Etat"
                                            name="etat"
                                            onChange={handleChange}
                                            required
                                            value={mission.etat}
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
                                            value={chauffeurs.find((chauffeur) => chauffeur?._id == mission?.chaffeur)?._id}
                                            label="Chauffeur"
                                        >
                                            {chauffeurs.map((chauffeur) => (
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
                                            value={vehicules?.find((vehicule) => vehicule?._id == mission?.vehicule)?._id}
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