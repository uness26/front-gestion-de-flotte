import React from 'react';
import image from './404.jpg';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const NotFound = () => {
        const navigate = useNavigate();
      
        const goBack = () => {
          navigate(-1);
        };
  return (
    <>
    <Stack direction="row" alignItems="center" spacing={1}>
    <IconButton aria-label="delete" size="large" onClick={goBack } 
    sx={{
        bgcolor: 'primary.main',
        color: 'white',
        '&:hover': {
          bgcolor: 'primary.dark',
        },
      }}
      >
      <ArrowBackIcon/>
    </IconButton>
   
  </Stack>
      <div id="wrapper">
        <img src={image} alt="Not Found" style={{ maxWidth: '80%', height: '100%' }} />
      </div>
     
    </>
  );
};

export default NotFound;
