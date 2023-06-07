import React from 'react'
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../contexts/auth";
import { useEffect } from "react";



export default function Login() {
  const navigate = useNavigate()
  const { login, loading, isAuthenticated } = useAuth();

  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (value) => {
      try {
        await login(value);
         navigate("/missions");
      } catch (err) {
        console.log(err)
        toast.error("Invalid crediantials, please try again");
      }
    },
  });
  useEffect(() => {
    if (!loading && isAuthenticated) {
      console.log("logged In " + isAuthenticated)
      navigate("/");
    }
  }, [])
 

  return (
    <>

    <title>
    Login
    </title>
      <Box
        component="main"
        sx={{
          height: 400,
          width : 800,
          alignItems: "center",
          display: "flex",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my:  4}}>
              <Typography color="textPrimary" variant="h4">
                Sign in
              </Typography>
            </Box>
            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            ></Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In Now
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
      <Toaster />
    </>
  )
}
