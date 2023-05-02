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
import { createMission } from "../../api/missions";

export default function AddMission() {
    const navigate = useNavigate();
    const [mission,setMission] = useState({});

    const handleChange = (event) => {
    setMission({
        ...mission,
        [event.target.name]: event.target.value
    });
    }
  
    const handleSubmit = (event ) => {
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
                                    <TextField
                                        fullWidth
                                        label="Date"
                                        name="date"
                                        onChange={handleChange}
                                        type = "date"
                                        value={mission.date}
                                        variant="outlined"
                                    />
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
                                    <TextField
                                        fullWidth
                                        label="Chauffeur"
                                        name="chauffeur"
                                        onChange={handleChange}
                                        value={mission.chauffeur}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Véhicule"
                                        name="vehicule"
                                        onChange={handleChange}
                                    
                                        value={mission.vehicule}
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