import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useAppSelector} from '../App/hooks.ts';
import {selectUser} from '../features/Users/usersSlice.ts';
import SecretMenuUsers from './SecretMenuUsers.tsx';
import UserMenu from './UserMenu.tsx';

const AppMainBar: React.FC = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Spotifly
        </Typography>
        {user ? (
          <UserMenu user={user}/>
        ) : (
          <SecretMenuUsers />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppMainBar;
