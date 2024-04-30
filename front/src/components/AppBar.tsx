import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const AppMainBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Spotifly
        </Typography>
        <Button color="inherit" component={Link} to="/login">Логин</Button>
        <Button color="inherit" component={Link} to="/register">Регистрация</Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppMainBar;
