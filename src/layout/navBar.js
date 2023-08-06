import React, { useState, useEffect } from 'react';
import * as PropTypes from 'prop-types'
import styled from "@emotion/styled";
import { AppBar, Avatar, Badge, Box, Button, IconButton, Toolbar, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Bell as BellIcon } from "../icons/bell";
import { UserCircle as UserCircleIcon } from "../icons/user-circle";
import { getUserProfile } from '../api/users';
import { useAuth } from "../contexts/auth";
import socket from "../contexts/socket_manager"
import Notification from "./notificationsCard"


const NavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const Navbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const [user, setUser] = useState();
  const {Logout}=useAuth();
  const [notification, setNotification] = useState(null); // Store the notification message here

  
  useEffect(() => {
    // Listen to the 'addReclamation' event and show the notification
    socket.on('addReclamation', (matricule) => {
      const message = `New reclamation added for driver ${JSON.parse(matricule)}`;
      setNotification(message);
    });
    
    socket.on('addReclamation', (matricule) => {
      const message = `New reclamation added for driver ${JSON.parse(matricule)}`;
      setNotification(message);
    });

  }, []);

  useEffect(() => {
    getUserProfile()
      .then((response) => {
        setUser(response.data)
      })
      .catch((error) => (
        console.error(error)
      ))
  }, [])

  const closeNotification = () => {
    setNotification(null);
  };
  
  return (
    <>

      <NavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          {notification && <Notification message={notification} onClose={()=>{}} />}
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}
            onClick={closeNotification}
            >
              <Badge badgeContent={notification ? 1 : 0} color="primary" variant="dot">
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>
          <Button sx={{ ml: 1 }} >
            {user?.nom} {user?.prenom}
          </Button>
          <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1,
            }}
            src=""
          >
            <UserCircleIcon fontSize="small" />
          </Avatar>
          <Button sx={{ ml: 1 }} onClick={Logout} >
            Logout
          </Button>
        </Toolbar>
      </NavbarRoot>

    </>
  );
};

 Navbar.propTypes = {
   onSidebarOpen: PropTypes.func,
 };
