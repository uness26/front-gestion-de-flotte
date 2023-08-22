import { Logo } from './logo';
import { NavItem } from './nav-item';
import { Box, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { Lock as LockIcon } from '../icons/lock';
import { Selector as SelectorIcon } from '../icons/selector';
import { Menu as MenuIcon } from '../icons/menu';
import { User as UserIcon } from '../icons/user';
import { Users as UsersIcon } from '../icons/users';
import { Link } from 'react-router-dom';
import * as PropTypes from 'prop-types'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const items = [
  {
    href: '/users',
    icon: (<UsersIcon fontSize="small" />),
    title: 'Chauffeurs',
  },
  {
    href: '/reclamations',
    icon: (<NewReleasesIcon fontSize="small" />),
    title: 'Réclamations'
  },
  {
    href: '/missions',
    icon: (<MenuIcon fontSize="small" />),
    title: 'Missions'
  },
  {
    href: '/vehicules',
    icon: (<DirectionsBusIcon fontSize="small" />),
    title: 'Véhicules'
  },
  {
    href: '/account',
    icon: (<UserIcon fontSize="small" />),
    title: 'Profile'
  },
];

export const Sidebar = (props) => {
  const { open, onClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <Link
              to="/"
              passHref
            >
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42
                  }}
                />
              </a>
            </Link>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius: 1
              }}
            >
              <div>
                <Typography
                  color="inherit"
                  variant="subtitle1"
                >
                  GESTION DE FLOTTE
                </Typography>
              </div>
            
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>

      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
      open={open}
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

Sidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
