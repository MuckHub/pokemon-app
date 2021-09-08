import React, { useEffect, useState } from 'react';
import Content from './Content';
import TopNav from './TopNav';
import Container from '@material-ui/core/Container';
import Pagination from './Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { POKEMON_API_URL } from '../constants/api';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    marginTop: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function Main() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(localStorage.getItem('page') || 0);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(
    localStorage.getItem('pokemons') || 10
  );
  const [isLoading, setIsLoading] = useState(true);

  const classes = useStyles();
  const history = useHistory();
  const pageOffset = page * pokemonsPerPage;
  const apiURL = POKEMON_API_URL(pokemonsPerPage, pageOffset);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(apiURL);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      history.push('/404');
    }
  };

  const handleChangePage = (event, newPage) => {
    localStorage.setItem('page', newPage);
    setPage(newPage);
  };

  const handleChangePokemonsPerPage = (event) => {
    setPokemonsPerPage(parseInt(event.target.value, 10));
    localStorage.setItem('pokemons', parseInt(event.target.value, 10));
    localStorage.setItem('page', 0);
    setPage(0);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pokemonsPerPage]);

  return (
    <>
      <TopNav />

      <Container maxWidth='md' className={classes.container}>
        {isLoading ? <CircularProgress /> : <Content data={data.results} />}
      </Container>

      {!isLoading && (
        <div className={classes.pagination}>
          <Pagination
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangePokemonsPerPage}
            page={+page}
            rowsPerPage={+pokemonsPerPage}
            count={data && data.count}
          />
        </div>
      )}
    </>
  );
}
