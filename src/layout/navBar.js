import * as PropTypes from 'prop-types'
import styled from "@emotion/styled";
import { AppBar, Avatar, Badge, Box, Button, IconButton, Toolbar, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Bell as BellIcon } from "../icons/bell";
import { UserCircle as UserCircleIcon } from "../icons/user-circle";

const NavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const Navbar = (props) => {
  const { onSidebarOpen, ...other } = props;

  //   const { user, isAuthenticated, loading, logout } = useAuth();

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
          <Tooltip title="Search">
            <IconButton sx={{ ml: 1 }}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={4} color="primary" variant="dot">
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>
          <Button sx={{ ml: 1 }} >
            Uness BEN AMMAR
          </Button>
          <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1,
            }}
            src=""
          >
            {/* {!loading && isAuthenticated ? (
              user?.nom[0] + user?.prenom[0]
            ) : ( */}
            <UserCircleIcon fontSize="small" />
            {/* )} */}
          </Avatar>
          {/* {!loading && isAuthenticated && ( */}
          <Button sx={{ ml: 1 }} >
            Logout
          </Button>
          {/* )} */}
        </Toolbar>
      </NavbarRoot>
    </>
  );
};

Navbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
