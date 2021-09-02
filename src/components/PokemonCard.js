import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    marginTop: 40,
    width: 200,
  },
  pos: {
    marginBottom: 12,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    marginTop: 40,
  },
  visible: {
    opacity: 1,
    transition: 'opacity 0.5s',
  },
  hidden: {
    opacity: 0,
  },
});

export default function PokemonCard({
  pokemonName,
  pokemonWeigth,
  pokemonImg,
  onLoad,
  isLoaded,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant='outlined'>
      <CardContent>
        <Typography variant='h5' component='h2'>
          {pokemonName}
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          Weight: {pokemonWeigth}
        </Typography>

        <img
          src={pokemonImg}
          alt={pokemonName}
          className={isLoaded ? classes.visible : classes.hidden}
          onLoad={() => onLoad(true)}
        />

        {!isLoaded && <CircularProgress />}
      </CardContent>
    </Card>
  );
}
