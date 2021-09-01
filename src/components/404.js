import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function NotFound() {
  const classes = useStyles();
  const history = useHistory();

  const refreshHandler = () => history.push('/');

  return (
    <Container maxWidth='md' className={classes.container}>
      Something went wrong
      <Button onClick={refreshHandler}>Refresh</Button>
    </Container>
  );
}
