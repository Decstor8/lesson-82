import {Card, CardActionArea, CardContent, CardMedia, CircularProgress, Grid, styled, Typography} from '@mui/material';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../App/hooks.ts';
import {selectArtists, selectIsLoading} from '../../store/artistsSlice.ts';
import {getArtists} from '../../store/asynсThunks.ts';
import {Link as RouterLink} from 'react-router-dom';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const mainIsLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    const fetchUrl = async () => {
      await dispatch(getArtists());
    };

    void fetchUrl();
  }, [dispatch]);

  return (
    <>
       <Grid container spacing={3}>
      {mainIsLoading ? (
        <Grid item xs={12} display="flex" justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        artists.map((elem) => (
          <Grid item xs={12} sm={6} md={3} key={elem._id}>
            <RouterLink to={`/albums/${elem._id}`} style={{ textDecoration: 'none' }}>
              <Card sx={{ maxWidth: 345, m: 'auto', boxShadow: 1 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    sx={{ height: 140, objectFit: 'cover' }}
                    image={elem.image ? `http://localhost:8000/${elem.image}` : undefined}
                    alt={elem.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {elem.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {elem.info}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </RouterLink>
          </Grid>
        ))
      )}
    </Grid>
    </>
  );
};

export default Artists;