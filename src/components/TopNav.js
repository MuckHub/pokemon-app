import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  navbar: {
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function TopNav() {
  const classes = useStyles();

  return (
    <AppBar className={classes.navbar} position='static'>
      <div>Pokemons</div>
    </AppBar>
  );
}
