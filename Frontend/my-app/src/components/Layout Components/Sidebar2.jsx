import React, { useState } from 'react';
import { Drawer, ListItem, ListItemButton, ListItemText, Typography, Collapse, IconButton } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import '../../App.css';

function SideBar2() {
  const [openAcademia, setOpenAcademia] = useState(false);
  const [openCompanies, setOpenCompanies] = useState(false);

  const handleClickAcademia = () => {
    setOpenAcademia(!openAcademia);
  };

  const handleClickCompanies = () => {
    setOpenCompanies(!openCompanies);
  };

  return (
    <Drawer
      sx={{
        width: 230,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 250,
          boxSizing: 'border-box',
          paddingTop: 1,
          paddingLeft: 1,
          backgroundColor: "#121110",
          borderRightColor: '#d01110',
          borderRightWidth: 6,
          overflowY: 'auto',
        },
      }}
      variant="permanent"
      anchor="left"
      className="custom-scrollbar"
    >
      <Typography sx={{ fontFamily: 'Helvetica', fontSize: 20, textAlign: 'center', fontWeight: 'bold', marginTop: 2, color: '#d3a550' }}>
        GUC Analytics Dashboard
      </Typography>
      <Toolbar />
      <Divider sx={{ height: 2 }} />
      <List>
        <ListItem>
          <ListItemButton component={Link} to="/">
            <Typography sx={{ fontFamily: 'Helvetica', color: '#d3a550', fontWeight: 'bold', textAlign: 'left', fontSize: 16 }}>
              Home
            </Typography>
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        <ListItem>
          <ListItemButton component={Link} to="/Overview">
            <Typography sx={{ fontFamily: 'Helvetica', color: '#d3a550', fontWeight: 'bold', textAlign: 'left', fontSize: 16 }}>
              Overview
            </Typography>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ height: 2 }} />
      <List>
        <ListItem>
          <ListItemButton onClick={handleClickAcademia}>
            <Typography sx={{ fontFamily: 'Helvetica', color: '#d3a550', fontWeight: 'bold', textAlign: 'left', fontSize: 16 }}>
              Academia
            </Typography>
            {openAcademia ? <ExpandLessIcon sx={{ color: 'white' }} /> : <ExpandMoreIcon sx={{ color: 'white' }} />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openAcademia} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton component={Link} to="/Academia/PostGraduate Studies" style={{ color: 'white' }}>
              <ListItemText primary="PostGraduate Studies" sx={{ pl: 4 }} />
            </ListItemButton>
            <ListItemButton component={Link} to="/Academia/Master Vs Phd" style={{ color: 'white' }}>
              <ListItemText primary="Master Vs Phd" sx={{ pl: 4 }} />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Divider sx={{ height: 2 }} />
      <List>
        <ListItem>
          <ListItemButton onClick={handleClickCompanies}>
            <Typography sx={{ fontFamily: 'Helvetica ', color: '#d3a550', fontWeight: 'bold', textAlign: 'left', fontSize: 16 }}>
              Working Conditions
            </Typography>
            {openCompanies ? <ExpandLessIcon sx={{ color: 'white' }} /> : <ExpandMoreIcon sx={{ color: 'white' }} />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openCompanies} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton component={Link} to="/Working Conditions/WorkModel" style={{ color: 'white' }}>
              <ListItemText primary="WorkModel" sx={{ pl: 4 }} />
            </ListItemButton>
            <ListItemButton component={Link} to="/Working Conditions/Heatmap" style={{ color: 'white' }}>
              <ListItemText primary="Heatmap" sx={{ pl: 4 }} />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Divider sx={{ height: 2 }} />
      <List>
        <ListItem>
          <ListItemButton component={Link} to="/Companies">
            <Typography sx={{ fontFamily: 'Helvetica', color: '#d3a550', fontWeight: 'bold', textAlign: 'left', fontSize: 16 }}>
              Companies
            </Typography>
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        <ListItem>
          <ListItemButton component={Link} to="/Batches Comparison">
            <Typography sx={{ fontFamily: 'Helvetica', color: '#d3a550', fontWeight: 'bold', textAlign: 'left', fontSize: 16 }}>
              Batches Comparison
            </Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default SideBar2;
