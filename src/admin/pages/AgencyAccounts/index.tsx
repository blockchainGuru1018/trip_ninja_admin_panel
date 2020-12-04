import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {
  Button,
  TextField,
  InputAdornment,
  Typography,
} from '@material-ui/core';
import { SearchOutlined } from "@material-ui/icons";
import PropTypes from "prop-types";
import {bindActionCreators, Dispatch} from "redux";

import { DataTable } from '../../components';
import AgencyAddModal from "./AgencyAddModal";

import { fetchAgencies } from "../../store/agencies/actions";
import { getAgencies, getTotalCount } from "../../store/agencies/selectors";

import "./styles.css";

const columns = [
  { field: 'agency_name', headerName: 'Account Name', sortable: true },
  { field: 'number_of_users', headerName: 'Number of Users', sortable: true },
  { field: 'dataSource', headerName: 'Data Source', sortable: true },
  { field: 'status', headerName: 'Status', sortable: true, getValue: (val: boolean) => val ? 'Active' : 'Archived' },
  { field: 'action', headerName: '' },
];

const propTypes = {
  agencies: PropTypes.arrayOf(PropTypes.any).isRequired,
  total: PropTypes.number.isRequired,
  fetchAgencies: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const AgencyAccounts: React.FC<Props> = ({ agencies, total, fetchAgencies }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    fetchAgencies({ page: 1, per_page: 10, keyword: '' });
  }, []);

  const onPageChange = (val: number) => {
    setPage(val);

    fetchAgencies({ page: val, per_page: pageSize, keyword });
  };

  const onPageSizeChange = (size: number) => {
    setPage(1);
    setPageSize(size);

    fetchAgencies({ page: 1, per_page: size, keyword });
  };

  const onKeywordChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(ev.target.value);
    setPage(1);

    fetchAgencies({ page: 1, per_page: pageSize, keyword: ev.target.value });
  };

  return (
    <div className="agencyAccounts__Page">
      <div className="page-header">
        <Typography variant="h3" component="h1" className="page-title">Agency Accounts</Typography>
        <Button variant="outlined" className="btn-primary" onClick={() => setModalOpened(true)}>Add Agency account</Button>
      </div>
      <Typography className="page-description">
        Add, edit, and remove available agency accounts.
      </Typography>
      <TextField
        placeholder="Search agency account name"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          )
        }}
        value={keyword}
        variant="outlined"
        onChange={onKeywordChange}
      />

      <Typography className="data-table-total">Agencies: { total || 0 }</Typography>
      <DataTable
        className="table"
        rows={agencies}
        columns={columns}
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />

      <AgencyAddModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </div>
  )
};

const mapStateToProps = (state: any) => {
  return {
    agencies: getAgencies(state.agencies),
    total: getTotalCount(state.agencies)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAgencies: bindActionCreators(fetchAgencies, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgencyAccounts);
