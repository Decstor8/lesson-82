import React, {useState} from 'react';
import {UserTypes} from '../types';
import {Button, Menu, MenuItem} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {logout} from '../features/Users/userThunks.ts';
import {useAppDispatch} from '../App/hooks.ts';

interface Props {
  user: UserTypes;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNav = () => {
    navigate('/track_history');
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const toNewArtist = () => {
    navigate('/new/artist');
  }

  return (
    <>
      <Button color="inherit" onClick={handleClick}>
        Hello, {user.username}!
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
        <MenuItem onClick={toNewArtist}>Add artist</MenuItem>
        <MenuItem>Add album</MenuItem>
        <MenuItem>Add track</MenuItem>
        <MenuItem onClick={handleNav}>Track history</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;