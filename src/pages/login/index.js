import React from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate()
  return (
   
    <div>
     <h1>Login</h1>
    
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          navigate("/users");
        } }>
        Chaufeurs
      </Button>

      <Button
      color="primary"
      variant="contained"
      onClick={() => {
        navigate("/vehicules");
      } }>
      Véhicules
    </Button>

    <Button
    color="primary"
    variant="contained"
    onClick={() => {
      navigate("/missions");
    } }>
    Missions
  </Button>

  <Button
  color="primary"
  variant="contained"
  onClick={() => {
    navigate("/reclamations");
  } }>
  Réclamations
</Button>
  </div>
  )
}