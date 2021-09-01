import React, { useEffect, useState } from 'react';
import FlexLayoutGrid from './Grid';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Pagination from './Pagination';
import { useHistory, useLocation } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbar: {
    height: 50,
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
  const [page, setPage] = useState(0);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(10);

  const classes = useStyles();
  let history = useHistory();
  let url = useLocation().search;

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const getData = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${params.limit}&offset=${
        params.page - 1
      }`
    );
    const data = await response.json();
    setData(data);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    history.push(`pokemon?limit=${pokemonsPerPage}&page=${newPage + 1}`);
  };

  const handleChangePokemonsPerPage = (event) => {
    setPokemonsPerPage(parseInt(event.target.value, 10));
    history.push(`pokemon?limit=${parseInt(event.target.value, 10)}&page=${1}`);
    setPage(0);
  };

  useEffect(() => {
    if (params.limit >= 0 && params.page >= 0) {
      setPokemonsPerPage(params.limit);
      setPage(params.page - 1);
      history.push(`pokemon?limit=${params.limit}&page=${params.page}`);
      getData();
    } else {
      setPokemonsPerPage(10);
      setPage(0);
      history.push('pokemon?limit=10&page=1');
    }
  }, []);

  useEffect(() => {
    getData();
  }, [url]);

  return (
    <>
      <AppBar className={classes.navbar} position='static'>
        <div>Pokemons</div>
      </AppBar>

      <Container maxWidth='md' className={classes.container}>
        {!data && <CircularProgress />}
        {data && <FlexLayoutGrid data={data.results} />}
      </Container>

      {data && (
        <div className={classes.pagination}>
          <Pagination
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangePokemonsPerPage}
            page={page}
            rowsPerPage={pokemonsPerPage}
            count={data && data.count}
          />
        </div>
      )}
    </>
  );
}
