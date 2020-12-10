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

import { DataTable, Dropdown } from '../../components';
import SingleAddModal from "./components/SingleAddModal";
import BulkAddModal from "./components/BulkAddModal";
import UserEditDrawer from "./components/UserEditDrawer";
import ArchiveModal from "./components/ArchiveModal";

import { fetchUsers } from "../../store/users/actions";
import { getUsers, getTotalCount } from "../../store/users/selectors";

import "./styles.css";

const propTypes = {
  users: PropTypes.arrayOf(PropTypes.any).isRequired,
  total: PropTypes.number.isRequired,
  fetchUsers: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const Users: React.FC<Props> = ({ users, total, fetchUsers }) => {
  const [modalOpened, setModalOpened] = useState<number | null>(null);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [userSelected, selectUser] = useState<any | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState('');

  const columns = [{
    field: 'username',
    headerName: 'Name',
    sortable: true,
    getValue: (val: string, row: any) => (
      <>
        <div className="username">{val}</div>
        <div className="user-email">{row.email}</div>
      </>
    )
  }, {
    field: 'team_name',
    headerName: 'Teams',
    sortable: true
  }, {
    field: 'is_active',
    headerName: 'Status',
    sortable: true,
    getValue: (val: boolean) => val ? 'Active' : 'Deactivated'
  }, {
    field: 'role',
    headerName: 'Role',
    sortable: true
  }, {
    field: 'last_login',
    headerName: 'Last Login',
    sortable: true,
    getValue: (val: string) => val ? moment(val).fromNow() : ''
  }, {
    field: 'is_active',
    headerName: '',
    getValue: (val: any, row: any) => (
      <Dropdown
        options={[
          { value: "edit", label: "Edit" },
          { value: "archive", label: val ? "Archive" : "Recover" }
        ]}
        placeholder="Actions"
        onChange={(value: string) => onSelectAction(value, row)}
      />
    )
  }];

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

  const onSelectAction = (action: string, user: any) => {
    if (action === 'edit') {
      selectUser(user);
      setDrawerOpened(true);
    } else if (action === 'archive') {
      selectUser(user);
      setModalOpened(3);
    }
  };

  const onCloseDrawer = () => {
    setDrawerOpened(false);
    selectUser(null);
  };

  return (
    <div className="user-Page">
      <div className="page-header">
        <Typography variant="h3" component="h1" className="page-title">
          Users
        </Typography>
        <div className="btn-group">
          <Button variant="outlined" className="btn-primary" onClick={() => setModalOpened(1)}>Add User</Button>
          <Button variant="outlined" className="btn-primary" onClick={() => setModalOpened(2)} style={{ marginLeft: 20 }}>Bulk Add</Button>
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
        opened={modalOpened === 1}
        onClose={() => setModalOpened(null)}
      />
      <BulkAddModal
        opened={modalOpened === 2}
        onClose={() => setModalOpened(null)}
      />
      <UserEditDrawer
        opened={drawerOpened}
        user={userSelected}
        onClose={onCloseDrawer}
      />
      <ArchiveModal
        opened={modalOpened === 3}
        user={userSelected}
        onClose={() => {
          setModalOpened(null);
          selectUser(null);
        }}
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
