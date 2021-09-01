import React, { useEffect, useState } from 'react';
import FlexLayoutGrid from './Grid';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Pagination from './Pagination';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 40,
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
  const [link, setLink] = useState(
    'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'
  );
  const [page, setPage] = React.useState(0);
  const [pokemonsPerPage, setPokemonsPerPage] = React.useState(10);
  const [count, setCount] = useState(null);

  const classes = useStyles();
  let history = useHistory();

  const getData = async () => {
    const response = await fetch(link);
    const data = await response.json();
    setData(data.results);
    setCount(data.count);
  };

  const handleChangePage = (event, newPage) => {
    setLink(
      `https://pokeapi.co/api/v2/pokemon?limit=${pokemonsPerPage}&offset=${
        pokemonsPerPage * newPage
      }`
    );
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPokemonsPerPage(parseInt(event.target.value, 10));
    setLink(
      `https://pokeapi.co/api/v2/pokemon?limit=${parseInt(
        event.target.value,
        10
      )}&offset=0`
    );
    setPage(0);
  };

  useEffect(() => {
    //checkUrlParams();
    getData();
  }, [link]);

  return (
    <>
      <AppBar className={classes.navbar} position='static'>
        <div>Pokemons</div>
      </AppBar>

      <Container maxWidth='md' className={classes.container}>
        <FlexLayoutGrid data={data} />
      </Container>
      <div className={classes.pagination}>
        <Pagination
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={pokemonsPerPage}
          count={count}
        />
      </div>
    </>
  );
}
