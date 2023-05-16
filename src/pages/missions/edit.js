import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import { updateMission, getMissionById } from '../../api/missions';
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

export default function EditMission() {
    const { id } = useParams();
    const [mission, setMission] = useState({});
    const [vehicules, setVehicules] = useState([]);
    const [chauffeurs, setChaffeurs] = useState([]);
    const navigate = useNavigate();
    const [date, setDate] = useState(
        dayjs(mission?.date),
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

    useEffect(() => {
        getMissionById(id)
            .then((response) => {
                setMission(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
            console.log(mission)
    }, [id]);

    const handleChange = (event) => {
        setMission({
            ...mission,
            [event.target.name]: event.target.value
        })
        console.log(mission)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const body = {
            etat : mission.etat,
            date : mission.date,
            vehicule : mission.vehicule,
            chauffeur : mission.chauffeur,
            lieuDep : mission.lieuDep,
            lieuArr : mission.lieuArr,
        }
        updateMission(id,body)
            .then((res) => {
                console.log(res)
                navigate("/missions")
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <title> EditMission </title>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}>
                <Container maxWidth="lg">
                    <Typography sx={{ mb: 3 }} variant="h4">
                        Edit Mission
                    </Typography>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <Card>
                            <CardHeader subheader="The information can be edited" title="Mission" />
                            <Divider />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item md={6} xs={12}>
                                    <InputLabel id="label">Lieu de départ</InputLabel>
                                        <TextField
                                            fullWidth
                                            name="lieuDep"
                                            onChange={handleChange}
                                            required
                                            value={mission?.lieuDep}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                    <InputLabel id="label">Lieu de Destination</InputLabel>
                                        <TextField
                                            fullWidth
                                            name="lieuArr"
                                            onChange={handleChange}
                                            required
                                            value={mission?.lieuArr}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                    <InputLabel id="label">etat</InputLabel>
                                        <TextField
                                            fullWidth
                                            name="etat"
                                            onChange={handleChange}
                                            required
                                            value={mission?.etat}
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
                                            value={mission?.chauffeur ? mission?.chauffeur : ""}
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
                                            value={mission?.vehicule ? mission?.vehicule : ""}
                                        >
                                            {vehicules?.map((vehicule) => (
                                                <MenuItem value={vehicule?._id}>{vehicule?.type} {vehicule?.marque} </MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                    <InputLabel id="label">Date</InputLabel>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                                            <DateField
                                                format="DD/MM/YYYY"
                                                name="date"
                                                value={dayjs(mission?.date)}
                                                required
                                                onChange={handleChangeDate}
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </LocalizationProvider>
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