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
import dayjs from 'dayjs';
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

export default function EditMission() {
    const { id } = useParams();
    const [mission, setMission] = useState({});
    const [vehicules, setVehicules] = useState([]);
    const [chauffeurs, setChaffeurs] = useState([]);
    const navigate = useNavigate();
    const [date, setDate] = useState();
    const [heureDep, setTime] = useState();


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
            date,
            heureDep,
        });
    }, [date, heureDep])

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

    const handleChangeDate = (newDate) => {
        const date = newDate.toISOString().slice(0, 10);
        setDate(date)
    };

    const handleChangeTime = (newTime) => {
        const time = newTime.toISOString().split("T")[1].slice(0, 5)
        setTime(time)
        console.log(time)
    };

    const handleChange = (event) => {
        setMission({
            ...mission,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const body = {
            etat: mission.etat,
            date: mission.date,
            heureDep: mission.heureDep,
            heureArr: mission.heureArr,
            vehicule: mission.vehicule,
            chauffeur: mission.chauffeur,
            lieuDep: mission.lieuDep,
            lieuArr: mission.lieuArr,
        }
        updateMission(id, body)
            .then((res) => {
                console.log(res)
                navigate("/missions")
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
        <Navbar />
        <Sidebar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}>
                <Navbar />
                <Sidebar />
                <Container maxWidth="lg">
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <Card>
                            <CardHeader subheader="The information can be edited" title="Mission" />
                            <Divider />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item md={6} xs={12}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                                            <DatePicker
                                                label="Date"
                                                format="DD/MM/YYYY"
                                                name="date"
                                                value={dayjs(mission?.date ? mission?.date : "")}
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
                                                required
                                                onChange={handleChangeTime}
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </LocalizationProvider>
                                    </Grid>
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
                                        <InputLabel id="label">Chauffeur</InputLabel>
                                        <Select
                                            labelId="label"
                                            id="select"
                                            name="chauffeur"
                                            fullWidth
                                            onChange={handleChange}
                                            defaultValue={mission.chaufeur ? mission.chaufeur : " "}                                        >
                                            {chauffeurs.map((chauffeur) => (
                                                <MenuItem value={chauffeur?._id}>{chauffeur?.nom} {chauffeur?.prenom}</MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <InputLabel id="label">Véhicule</InputLabel>
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