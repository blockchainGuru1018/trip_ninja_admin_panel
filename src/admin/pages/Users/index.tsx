import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import {
  Button,
  TextField,
  InputAdornment,
  Typography,
} from '@material-ui/core';
import { SearchOutlined } from "@material-ui/icons";
import moment from "moment";
import PropTypes from 'prop-types';
import { bindActionCreators, Dispatch } from "redux";

import { DataTable } from '../../components';
import SingleAddModal from "./SingleAddModal";
import BulkAddModal from "./BulkAddModal";

import { fetchUsers } from "../../store/users/actions";
import { getUsers, getTotalCount } from "../../store/users/selectors";

import "./styles.css";

const columns = [
  { field: 'username', headerName: 'Name', sortable: true },
  { field: 'team', headerName: 'Teams', sortable: true },
  { field: 'status', headerName: 'Status', sortable: true, getValue: (val: boolean) => val ? 'Active' : 'Deactivated' },
  { field: 'role', headerName: 'Role', sortable: true },
  { field: 'last_login', headerName: 'Last Login', sortable: true, getValue: (val: string) => moment(val).fromNow() },
  { field: 'action', headerName: '' }
];

const propTypes = {
  users: PropTypes.arrayOf(PropTypes.any).isRequired,
  total: PropTypes.number.isRequired,
  fetchUsers: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const Users: React.FC<Props> = ({ users, total, fetchUsers }) => {
  const [singleModalOpened, setSingleModalOpened] = useState(false);
  const [bulkModalOpened, setBulkModalOpened] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    fetchUsers({ page: 1, per_page: 10, keyword: '' });
  }, []);

  const onPageChange = (val: number) => {
    setPage(val);

    fetchUsers({ page: val, per_page: pageSize, keyword });
  };

  const onPageSizeChange = (size: number) => {
    setPage(1);
    setPageSize(size);

    fetchUsers({ page: 1, per_page: size, keyword });
  };

  const onKeywordChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(ev.target.value);
    setPage(1);

    fetchUsers({ page: 1, per_page: pageSize, keyword: ev.target.value });
  };

  return (
    <div className="user__Page">
      <div className="page-header">
        <Typography variant="h3" component="h1" className="page-title">
          Users
        </Typography>
        <div className="btn-group">
          <Button variant="outlined" className="btn-primary" onClick={() => setSingleModalOpened(true)}>Add User</Button>
          <Button variant="outlined" className="btn-primary" onClick={() => setBulkModalOpened(true)} style={{ marginLeft: 20 }}>Bulk Add</Button>
        </div>
      </div>
      <Typography className="page-description">
        Create new users, customize user permissions, and remove users from your account.
      </Typography>
      <TextField
        placeholder="Search users or teams"
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

      <Typography className="data-table-total">Active users: { total || 0 }</Typography>
      <DataTable
        className="table"
        rows={users}
        columns={columns}
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />

      <SingleAddModal
        opened={singleModalOpened}
        onClose={() => setSingleModalOpened(false)}
      />

      <BulkAddModal
        opened={bulkModalOpened}
        onClose={() => setBulkModalOpened(false)}
      />
    </div>
  )
};

const mapStateToProps = (state: any) => {
  return {
    users: getUsers(state.users),
    total: getTotalCount(state.users)
  };
};
  
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUsers: bindActionCreators(fetchUsers, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
