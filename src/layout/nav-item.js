import * as PropTypes from 'prop-types'
import { Box, Button, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';

export const NavItem = (props) => {
  const { href, icon, title, ...others } = props;

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2
      }}
      {...others}
    >
      <Link
        to={href}
        passHref
      >
        <Button
          component="a"
          startIcon={icon}
          disableRipple
          sx={{
            borderRadius: 1,
            fontWeight: 'fontWeightBold',
            justifyContent: 'flex-start',
            px: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '& .MuiButton-startIcon': {
            },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255, 0.08)'
            }
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            {title}
          </Box>
        </Button>
      </Link>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string
};
