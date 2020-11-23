import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import RowsPerPage from './RowsPerPage';

const propTypes = {
  className: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string.isRequired,
    headerName: PropTypes.string.isRequired
  }).isRequired).isRequired,
  rows: PropTypes.arrayOf(PropTypes.any),
};

type Props = PropTypes.InferProps<typeof propTypes>

const DataTable:React.FC<Props> = ({ className, columns, rows }) => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <div className={classNames(classes.content, className)}>
      <Typography className={classes.rowsLabel}>Teams: { rows ? rows.length : 0 }</Typography>

      <TableContainer component={Paper} className={classes.paper}>
        <Table className={classes.table}>
          <TableHead className={classes.tableHeader}>
            <TableRow>
              {columns.map((el, idx) => (
                <TableCell key={idx} className={classes.tableHeaderCell}>{el.headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
        <PerfectScrollbar style={{ maxHeight: 250, width: '100%' }}>
          <Table className={classes.table}>
            {rows && rows.length > 0 ? (
              <TableBody>
                {rows.map((row, i) => (
                  <TableRow key={i}>
                    {columns.map((col, j) => (
                      <TableCell key={`${i}-${j}`} className={classes.tableCell}>
                        {row[col.field]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <></>
            )}
          </Table>
        </PerfectScrollbar>
      </TableContainer>

      <div className={classes.pagination}>
        <Pagination count={10} />

        <RowsPerPage className={classes.rowsPerPage} value={rowsPerPage} onChange={setRowsPerPage} />
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  content: {

  },
  rowsLabel: {
    fontSize: 18,
    color: '#45565E'
  },
  paper: {
    marginTop: 15
  },
  table: {
    minWidth: 650,
  },
  tableHeader: {
    background: '#F5F8FA'
  },
  tableHeaderCell: {
    fontSize: 16,
    color: '#45565E',
    fontFamily: 'NeuzitGrotesk',
    fontWeight: 'bold',
  },
  tableCell: {
    fontSize: 14,
    color: '#45565E',
    fontFamily: 'NeuzitGrotesk',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30
  },
  rowsPerPage: {
    marginLeft: 30
  }
});

export default DataTable;
