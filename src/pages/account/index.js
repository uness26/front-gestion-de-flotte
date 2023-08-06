import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUser } from '../../api/users';
import { Sidebar } from '../../layout/sideBar';
import { Navbar } from '../../layout/navBar';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import {
    InputLabel,
    Avatar,
    Box,
    Button,
    Card,
    Container,
    Stack,
    Typography,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Unstable_Grid2 as Grid
} from '@mui/material';

const AccountProfile = () => (
    <Card>
        <Navbar />
        <Sidebar />
        <CardContent>
            <Box
                sx={{
                    color: 'red',

                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Avatar
                    sx={{
                        height: 80,
                        mb: 2,
                        width: 80
                    }}
                />

            </Box>
        </CardContent>
        <CardActions>
            <Button
                fullWidth
                variant="text"
            >
                Mettre à jour
            </Button>
        </CardActions>
    </Card>
);

const Account = () => {
    const [user, setUser] = useState(null);


    useEffect(() => {
        getUserProfile()
            .then((response) => {
                console.log(response)
                setUser(response.data)
            })
            .catch((error) => (
                console.error(error)
            ))
    }, [])




    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const id = user._id
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
                alert('Profile updeted')
            })
            .catch((err) => console.log(err));
    };


    return (
        <>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="lg">
                    <Stack spacing={3}>
                        <div>
                            <Typography variant="h4">
                                Profile Adminstrateur
                            </Typography>
                        </div>
                        <div>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid
                                    xs={12}
                                    md={6}
                                    lg={4}
                                >
                                    <AccountProfile user={user} />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                    lg={8}
                                >
                                    <form
                                        autoComplete="off"
                                        noValidate
                                        onSubmit={handleSubmit}
                                    >
                                        <Card>
                                            <CardContent sx={{ pt: 1 }}>
                                                <Box sx={{ m: -1.5 }}>
                                                    <Grid
                                                        container
                                                        spacing={3}
                                                    >
                                                    <Grid
                                                            xs={12}
                                                            md={6}
                                                        >
                                                            <InputLabel id="label">Matricule</InputLabel>
                                                            <TextField
                                                                fullWidth
                                                                name="matricule"
                                                                onChange={handleChange}
                                                                required
                                                                value={user?.matricule}
                                                            />
                                                        </Grid>
                                                        <Grid
                                                            xs={12}
                                                            md={6}
                                                        >
                                                            <InputLabel id="label">Nom</InputLabel>
                                                            <TextField
                                                                fullWidth
                                                                name="nom"
                                                                onChange={handleChange}
                                                                required
                                                                value={user?.nom}
                                                            />
                                                        </Grid>
                                                        <Grid
                                                            xs={12}
                                                            md={6}
                                                        >
                                                            <InputLabel id="label">Prénom</InputLabel>
                                                            <TextField
                                                                fullWidth
                                                                name="prenom"
                                                                onChange={handleChange}
                                                                required
                                                                value={user?.prenom}
                                                            />
                                                        </Grid>
                                                        <Grid
                                                            xs={12}
                                                            md={6}
                                                        >
                                                            <InputLabel id="label">Email</InputLabel>
                                                            <TextField
                                                                fullWidth
                                                                name="email"
                                                                onChange={handleChange}
                                                                required
                                                                value={user?.email}
                                                            />
                                                        </Grid>
                                                        <Grid
                                                            xs={12}
                                                            md={6}
                                                        >
                                                            <InputLabel id="label">Téléphone</InputLabel>
                                                            <TextField
                                                                fullWidth
                                                                name="tel"
                                                                onChange={handleChange}
                                                                type="number"
                                                                value={user?.tel}
                                                            />
                                                        </Grid>
                                                        <Grid
                                                            xs={12}
                                                            md={6}
                                                        >
                                                            <InputLabel id="label">Numéro CIN</InputLabel>
                                                            <TextField
                                                                fullWidth
                                                                name="CIN"
                                                                onChange={handleChange}
                                                                type="number"
                                                                value={user?.CIN}
                                                            />
                                                        </Grid>
                                                        <Grid
                                                            xs={12}
                                                            md={6}
                                                        >
                                                            <InputLabel id="label">Mot de passe</InputLabel>
                                                            <TextField
                                                                fullWidth
                                                                name="password"
                                                                onChange={handleChange}
                                                                value={user?.password}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </CardContent>
                                            <Divider />
                                            <CardActions sx={{ justifyContent: 'flex-end' }}>
                                                <Button variant="contained" onClick={handleSubmit}>
                                                    Save details
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </form>
                                </Grid>
                            </Grid>
                        </div>
                    </Stack>
                </Container>
            </Box>
        </>
    );
}

export default Account;