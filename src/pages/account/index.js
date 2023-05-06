import React,{useState} from 'react';
import {
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

const user = {
    avatar: '/assets/avatars/avatar-anika-visser.png',
    city: 'Los Angeles',
    country: 'USA',
    jobTitle: 'Senior Developer',
    name: 'Anika Visser',
    timezone: 'GTM-7'
};

const AccountProfile = () => (
    <Card>
        <CardContent>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Avatar
                    src={user.avatar}
                    sx={{
                        height: 80,
                        mb: 2,
                        width: 80
                    }}
                />
                <Typography
                    gutterBottom
                    variant="h5"
                >
                    {user.name}
                </Typography>
                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                    {user.city} {user.country}
                </Typography>
                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                    {user.timezone}
                </Typography>
            </Box>
        </CardContent>
        <Divider />
        <CardActions>
            <Button
                fullWidth
                variant="text"
            >
                Upload picture
            </Button>
        </CardActions>
    </Card>
);

const Account = () => {
    const [values, setValues] = useState(user);
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
                                Account
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
                                    <AccountProfile />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                    lg={8}
                                >
                                    <form
                                        autoComplete="off"
                                        noValidate
                                    // onSubmit={handleSubmit}
                                    >
                                        <Card>
                                            <CardHeader
                                                subheader="The information can be edited"
                                                title="Profile"
                                            />
                                            <CardContent sx={{ pt: 0 }}>
                                                <Box sx={{ m: -1.5 }}>
                                                    <Grid
                                                        container
                                                        spacing={3}
                                                    >
                                                        <Grid
                                                            xs={12}
                                                            md={6}
                                                        >
                                                            <TextField
                                                                fullWidth
                                                                helperText="Please specify the first name"
                                                                label="First name"
                                                                name="firstName"
                                                                // onChange={handleChange}
                                                                required
                                                                value={values?.firstName}
                                                            />
                                                        </Grid>
                                                        <Grid
                                                            xs={12}
                                                            md={6}
                                                        >
                                                            <TextField
                                                                fullWidth
                                                                label="Last name"
                                                                name="lastName"
                                                                // onChange={handleChange}
                                                                required
                                                                value={values?.lastName}
                                                            />
                                                        </Grid>
                                                        <Grid
                                                            xs={12}
                                                            md={6}
                                                        >
                                                            <TextField
                                                                fullWidth
                                                                label="Email Address"
                                                                name="email"
                                                                // onChange={handleChange}
                                                                required
                                                                value={values?.email}
                                                            />
                                                        </Grid>
                                                        <Grid
                                                            xs={12}
                                                            md={6}
                                                        >
                                                            <TextField
                                                                fullWidth
                                                                label="Phone Number"
                                                                name="phone"
                                                                // onChange={handleChange}
                                                                type="number"
                                                                value={values?.phone}
                                                            />
                                                        </Grid>
                                                        <Grid
                                                            xs={12}
                                                            md={6}
                                                        >
                                                            <TextField
                                                                fullWidth
                                                                label="Country"
                                                                name="country"
                                                                // onChange={handleChange}
                                                                required
                                                                value={values?.country}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </CardContent>
                                            <Divider />
                                            <CardActions sx={{ justifyContent: 'flex-end' }}>
                                                <Button variant="contained">
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