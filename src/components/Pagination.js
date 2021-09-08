import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';

import { useTranslation } from 'react-i18next';

export default function Pagination({
  onPageChange,
  onRowsPerPageChange,
  page,
  rowsPerPage,
  count,
}) {
  const { t } = useTranslation();
  return (
    <TablePagination
      component='div'
      count={count}
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onRowsPerPageChange}
      labelRowsPerPage={t('perPage')}
      rowsPerPageOptions={[5, 10, 50]}
    />
  );
}
