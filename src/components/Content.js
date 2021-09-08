import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

import { makeStyles } from '@material-ui/core/styles';
import { POKEMON } from '../fileWithConstants';

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function CustomPaginationActionsTable({ data }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='custom pagination table'>
        <TableBody>
          {data.map((pokemon) => {
            const pokemonUrl = POKEMON + pokemon.url.split('/')[6];

            return (
              <TableRow key={pokemon.name}>
                <TableCell component='th' scope='row'>
                  <Link href={pokemonUrl}>{pokemon.name}</Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
