import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    marginTop: 40,
    width: 200,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: { textAlign: 'center' },
  pos: {
    marginBottom: 12,
    textAlign: 'center',
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
  const { t } = useTranslation();

  return (
    <Card className={classes.root} variant='outlined'>
      <CardContent className={classes.card}>
        <Typography className={classes.name} variant='h5' component='h2'>
          {pokemonName}
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          {t('weight')} {pokemonWeigth}
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
