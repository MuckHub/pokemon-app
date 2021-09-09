import { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import i18n from 'i18next';

import { makeStyles } from '@material-ui/core/styles';
import { LANGUAGES } from '../constants/index';

const useStyles = makeStyles((theme) => ({
  navbar: {
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginLeft: 30,
  },
  button: {
    marginRight: 10,
  },
}));

export default function TopNav() {
  const classes = useStyles();

  const [language, setLanguage] = useState(
    localStorage.getItem('lng') || i18n.language
  );

  const changeHandler = (language) => {
    setLanguage(language);
    localStorage.setItem('lng', language);
  };

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <AppBar className={classes.navbar} position='static'>
      <div className={classes.title}>Pokemons</div>
      <div>
        <Button
          className={classes.button}
          variant='outlined'
          color={language === LANGUAGES.ENGLISH ? 'inherit' : 'default'}
          onClick={() => changeHandler(LANGUAGES.ENGLISH)}
        >
          {LANGUAGES.ENGLISH}
        </Button>
        <Button
          className={classes.button}
          variant='outlined'
          color={language === LANGUAGES.GERMAN ? 'inherit' : 'default'}
          onClick={() => changeHandler(LANGUAGES.GERMAN)}
        >
          {LANGUAGES.GERMAN}
        </Button>
      </div>
    </AppBar>
  );
}
