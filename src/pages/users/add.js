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
import { createUser } from "../../api/users";
import { Sidebar } from '../../layout/sideBar';
import { Navbar } from '../../layout/navBar';

export default function AddUser() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});



    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(user)
        createUser(user)
            .then((res) => {
                console.log(res);
                navigate("/users");
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <Navbar />
            <Sidebar />
            <title> AddUser </title>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}>
                <Container maxWidth="lg">
                    <Typography sx={{ mb: 3 }} variant="h4">
                        Ajouter Chauffeur
                    </Typography>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <Card>
                            <Divider />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Nom"
                                            name="nom"
                                            onChange={handleChange}
                                            required
                                            value={user.nom}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Prénom"
                                            name="prenom"
                                            onChange={handleChange}
                                            required
                                            value={user.prenom}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Phone"
                                            name="tel"
                                            type="number"
                                            onChange={handleChange}
                                            required
                                            value={user.tel}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="CIN"
                                            name="CIN"
                                            type="number"
                                            onChange={handleChange}
                                            required
                                            value={user.CIN}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            name="email"
                                            onChange={handleChange}
                                            required
                                            type='email'
                                            value={user.email}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Password"
                                            name="password"
                                            onChange={handleChange}
                                            type='password'
                                            required
                                            value={user.password}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <FormControl>
                                            <FormLabel id="demo-controlled-radio-buttons-group">Role</FormLabel>
                                            <RadioGroup
                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                name="role"
                                                value={user.role}
                                                onChange={handleChange}
                                            >
                                                <FormControlLabel value="ADMIN" control={<Radio />} label="Admin" />
                                                <FormControlLabel value="CHAUFFEUR" control={<Radio />} label="Chauffeur" />
                                            </RadioGroup>
                                        </FormControl>
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