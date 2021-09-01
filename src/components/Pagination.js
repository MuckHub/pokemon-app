import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';

export default function TablePaginationDemo({
  onPageChange,
  onRowsPerPageChange,
  page,
  rowsPerPage,
  count,
}) {
  return (
    <TablePagination
      component='div'
      count={count}
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onRowsPerPageChange}
      labelRowsPerPage='Pokemons per page:'
      rowsPerPageOptions={[5, 10, 50]}
    />
  );
}
