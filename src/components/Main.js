import React, { useEffect, useState } from 'react';
import Content from './Content';
import TopNav from './TopNav';
import Container from '@material-ui/core/Container';
import Pagination from './Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

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
  const [page, setPage] = useState(0);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(10);

  const classes = useStyles();
  let history = useHistory();
  let url = useLocation().search;

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const getData = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${params.limit}&offset=${
          (params.page - 1) * params.limit
        }`
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      history.push('/404');
    }
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
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <>
      <TopNav />

      <Container maxWidth='md' className={classes.container}>
        {!data && <CircularProgress />}
        {data && <Content data={data.results} />}
      </Container>

      {data && (
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
