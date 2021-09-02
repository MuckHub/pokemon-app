import React, { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';
import { useParams, useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    marginTop: 40,
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
        <PokemonCard
          pokemonName={pokemonData.name}
          pokemonWeigth={pokemonData.weight}
          pokemonImg={pokemonData.sprites.front_default}
          isLoaded={imgLoaded}
          onLoad={setImgLoaded}
        />
      )}

      {pokemonData && <Button onClick={goBack}>Back</Button>}
    </Container>
  );
}
