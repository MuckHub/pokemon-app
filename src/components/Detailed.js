import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams, useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    marginTop: 40,
    width: 200,
  },
  pos: {
    marginBottom: 12,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    marginTop: 40,
  },
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
});

export default function Detailed() {
  const [pokemonData, setPokemonData] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  let { id } = useParams();

  const goBack = () => {
    history.goBack();
  };

  const getPokemonData = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setPokemonData(data);
    } catch (error) {
      history.push('/404');
    }
  };

  useEffect(() => {
    getPokemonData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className={classes.container}>
      {!pokemonData && <CircularProgress className={classes.spinner} />}
      {pokemonData && (
        <Card className={classes.root} variant='outlined'>
          <CardContent>
            <Typography variant='h5' component='h2'>
              {pokemonData.name}
            </Typography>
            <Typography className={classes.pos} color='textSecondary'>
              Weight: {pokemonData.weight}
            </Typography>

            <img
              src={pokemonData.sprites.front_default}
              alt={pokemonData.name}
              className={imgLoaded ? classes.visible : classes.hidden}
              onLoad={() => setImgLoaded(true)}
            />

            {!imgLoaded && <CircularProgress />}
          </CardContent>
        </Card>
      )}

      {pokemonData && <Button onClick={goBack}>Back</Button>}
    </Container>
  );
}
