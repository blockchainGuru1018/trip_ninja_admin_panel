import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Paper,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import { Sort as SortIcon } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import RowsPerPage from './RowsPerPage';

import "./styles.css";

const propTypes = {
  className: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string.isRequired,
    headerName: PropTypes.string.isRequired,
    width: PropTypes.string,
    sortable: PropTypes.bool
  }).isRequired).isRequired,
  rows: PropTypes.arrayOf(PropTypes.any),
};

type Props = PropTypes.InferProps<typeof propTypes>

const DataTable:React.FC<Props> = ({ className, columns, rows }) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <div className={classNames("dataTable__Component", className)}>
      <TableContainer component={Paper}>
        <Table className="dataTable__Component__table">
          <TableHead className="table-header">
            <TableRow>
              {columns.map((el, idx) => (
                <TableCell key={idx} className="table-header-cell">
                  {el.sortable ? (
                    <div className="sortable-column">
                      <span>{el.headerName}</span>
                      <SortIcon />
                    </div>
                  ) : (
                    el.headerName
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <PerfectScrollbar className="table-body" component="tbody">
            {rows && rows.length > 0 ? (
              rows.map((row, i) => (
                <TableRow key={i}>
                  {columns.map((col, j) => (
                    <TableCell key={`${i}-${j}`} className="table-cell">
                      {row[col.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <></>
            )}
          </PerfectScrollbar>
        </Table>
      </TableContainer>

      <div className="pagination">
        <Pagination count={10} />

        <RowsPerPage className="rows-per-page" value={rowsPerPage} onChange={setRowsPerPage} />
      </div>
    </div>
  );
};

export default DataTable;
