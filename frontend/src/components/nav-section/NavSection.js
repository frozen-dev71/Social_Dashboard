import * as React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText, Collapse, ListItemButton, Rating } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';
// import Dashboards from '../../_mock/Dashboards'
import { logoutUser } from '../../redux/actions/authActions';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

const dashboardData = {
  "dashboards": [
    {
      "name": "facebook",
      "favorite": true,
    }, 
    {
      "name": "Stripe",
      "favorite": true,
    },
    {
      "name": "Google",
      "favorite": true,
    },
    {
      "name": "Google Analytics",
      "favorite": false,
    },
    {
      "name": "Instagram",
      "favorite": false,
    },
    {
      "name": "twitter",
      "favorite": false,
    },
  ]
};

if (!localStorage.getItem("dashboardData")) localStorage.setItem("dashboardData", JSON.stringify(dashboardData));

const localData = JSON.parse(localStorage.getItem("dashboardData"));

function customSort(a, b) {
  if (a.favorite && !b.favorite) {
    return -1; // a should appear before b
  }
  if (!a.favorite && b.favorite) {
    return 1; // b should appear before a
  }
  return a.name.localeCompare(b.name); // sort alphabetically
}

localData.dashboards.sort(customSort);

const changeFav = (index) => {
  localData.dashboards[index].favorite = !localData.dashboards[index].favorite;
  console.log(localData.dashboards[index], index)
  localStorage.setItem("dashboardData", JSON.stringify(localData));
}

// changeFav(dashboardData.dashboards[0]);

export default function NavSection({ data = [], ...other }) {

  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Box {...other}>
      <ListItemButton onClick = {handleClick}> 
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboards" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {_.map(localData.dashboards, (item, index) => (
            <ListItemButton key={index} sx={{ pl: 4 }}>
              <ListItemText primary={item.name} />
              <ListItemIcon onMouseUp={() => changeFav(index)}>
                {item.favorite ? <Rating name="customized-10" defaultValue={1} max={1} /> : <Rating name="customized-10" defaultValue={0} max={1} />}
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Collapse>
      <ListItemButton component='a' href='/' key="integration" >
        <ListItemIcon>
          <IntegrationInstructionsIcon />
        </ListItemIcon>
        <ListItemText primary="Integration" />
      </ListItemButton>
      <ListItemButton component='a' href='/user' key="Teams" >
        <ListItemIcon>
          <PeopleAltIcon />
        </ListItemIcon>
        <ListItemText primary="Teams" />
      </ListItemButton>
      <ListItemButton component='a' href='/edit' key="setting" onClick={handleClose}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Setting" />
      </ListItemButton>
      <ListItemButton key="Sign Out" onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Sign Out" />
      </ListItemButton>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
