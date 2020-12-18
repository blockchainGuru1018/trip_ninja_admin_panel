import React from 'react';
import {
  Paper,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableBody,
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
    sortable: PropTypes.bool,
    getValue: PropTypes.func,
  }).isRequired).isRequired,
  rows: PropTypes.arrayOf(PropTypes.any),
  total: PropTypes.number,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
};

type Props = PropTypes.InferProps<typeof propTypes>

const DataTable:React.FC<Props> = ({ className, columns, rows, total, page, pageSize, onPageChange, onPageSizeChange }) => {
  const handlePageChange = (ev: React.ChangeEvent<unknown>, val: number) => {
    onPageChange && onPageChange(val);
  };

  const handlePageSizeChange = (size: number) => {
    onPageSizeChange && onPageSizeChange(size)
  };

  return (
    <div className={classNames("dataTable-Component", className)}>
      <TableContainer component={Paper}>
        <Table className="dataTable-Component-table">
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
          <TableBody>
            {rows && rows.length > 0 ? (
              rows.map((row, i) => (
                <TableRow key={i}>
                  {columns.map((col, j) => (
                    <TableCell key={`${i}-${j}`} className="table-cell">
                      {!col.getValue ? row[col.field] : col.getValue(row[col.field], row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="pagination">
        <Pagination count={Math.ceil((total || 0) / (pageSize || 10))} page={page || 1} onChange={handlePageChange} />

        <RowsPerPage className="rows-per-page" value={pageSize || 10} onChange={handlePageSizeChange} />
      </div>
    </div>
  );
};

export default DataTable;
