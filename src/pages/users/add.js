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

export default function AddUser() {
    const navigate = useNavigate();
    const [user,setUser] = useState({});

    const validateCin = (cin) => {
        for(var i = 0 ;  i < cin.toString().length ;++i){
            if(isNaN(cin[i])){
                return false;
            }
        }
        return true;
    }

    const handleChange = (event) => {
    if(event.target.name === "CIN"){
        if(!validateCin) {
            alert("Invalid CIN")
            return 
        }
    }
    setUser({
        ...user,
        [event.target.name]: event.target.value
    });
    }
  
    const handleSubmit = (event ) => {
    event.preventDefault();
    createUser(user)
        .then((res) => {
        console.log(res);
        navigate("/");
        })
        .catch((err) => console.log(err));
    };

  return (
    <>
        <title> AddUser </title>
        <Box
            component="main"
            sx={{
            flexGrow: 1,
            py: 8,
        }}>
            <Container maxWidth="lg">
                <Typography sx={{ mb: 3 }} variant="h4">
                    Add User
                </Typography>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader subheader="The information can be edited" title="User" />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        helperText="Please specify the first name"
                                        label="First name"
                                        name="name"
                                        onChange={handleChange}
                                        required
                                        value={user.firstName}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Last name"
                                        name="prenom"
                                        onChange={handleChange}
                                        required
                                        value={user.lastName}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Phone"
                                        name="tel"
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
                                            <FormControlLabel value="USER" control={<Radio />} label="User" />
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
                            <Button color="primary" variant="contained" type="submit">
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