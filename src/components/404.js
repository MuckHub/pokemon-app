import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const refreshHandler = () => history.push('/');

  return (
    <Container maxWidth='md' className={classes.container}>
      {t('error')}
      <Button onClick={refreshHandler}>{t('refresh')}</Button>
    </Container>
  );
}
