import {Button, Grid} from '@mui/material';
import {Link as navLink} from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <Grid item>
      <Button component={navLink} to="register" color="inherit">Регистрация</Button>
      <Button component={navLink} to="login" color="inherit">Логин</Button>
    </Grid>
  );
};

export default AnonymousMenu;