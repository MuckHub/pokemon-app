import React, { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import TopNav from './TopNav';
import axios from 'axios';

import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { useParams, useHistory } from 'react-router-dom';
import { DETAILED_POKEMON_URL } from '../fileWithConstants';

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
  button: {
    marginTop: 10,
  },
});

export default function Detailed() {
  const [pokemonData, setPokemonData] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const { t } = useTranslation();

  const goBack = () => {
    history.goBack();
  };

  const getPokemonData = async () => {
    try {
      const response = await axios.get(DETAILED_POKEMON_URL + id);
      setPokemonData(response.data);
    } catch (error) {
      history.push('/404');
    }
  };

  useEffect(() => {
    getPokemonData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TopNav />
      <Container className={classes.container}>
        {!pokemonData && <CircularProgress className={classes.spinner} />}
        {pokemonData && (
          <PokemonCard
            className={classes.card}
            pokemonName={pokemonData.name}
            pokemonWeigth={pokemonData.weight}
            pokemonImg={pokemonData.sprites.front_default}
            isLoaded={imgLoaded}
            onLoad={setImgLoaded}
          />
        )}

        {pokemonData && (
          <Button className={classes.button} onClick={goBack}>
            {t('back')}
          </Button>
        )}
      </Container>
    </>
  );
}
