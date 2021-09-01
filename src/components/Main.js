import React, { useEffect, useState } from 'react';
import FlexLayoutGrid from './Grid';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Pagination from './Pagination';
import { useHistory } from 'react-router-dom';
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

  const getData = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${pokemonsPerPage}&offset=${page}`
    );
    const data = await response.json();
    setData(data);
    history.push(`/pokemon?limit=${pokemonsPerPage}&page=${page + 1}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangePokemonsPerPage = (event) => {
    setPokemonsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const checkUrlParams = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    if (params.limit > 1 && params.page > 1) {
      setPokemonsPerPage(+params.limit);
      setPage(params.page - 1);
    }
  };

  useEffect(() => {
    checkUrlParams();
  }, []);

  useEffect(() => {
    getData();
  }, [pokemonsPerPage, page]);

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
