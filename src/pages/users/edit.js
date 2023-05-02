import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useParams } from "react-router-dom";
import { useState , useEffect } from 'react'
import { updateUser, getUserById } from '../../api/users';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function EditUser() {
    const { id } = useParams();
    const idUser  = id.substring(1,id.length);
    const [user,setUser] = useState({});
    const navigate = useNavigate();
    
      useEffect(()=>{
        getUserById(id)
        .then((Response) => {
            setUser(Response.data);
        })
        .catch((error)=>{
          console.error(error)
      })},[id]);

    const handleChange = (event) => {
    setUser({
        ...user,
        [event.target.name]: event.target.value
    })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        updateUser(user)
            .then((res) => {
            console.log(res)
            navigate("/users")
            })
            .catch((err) => console.log(err));
    };
    
  return (
    <>
    <title> EditUser </title>
    <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
      }}>
      <Container maxWidth="lg">
        <Typography sx={{ mb: 3 }} variant="h4">
            Edit User
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