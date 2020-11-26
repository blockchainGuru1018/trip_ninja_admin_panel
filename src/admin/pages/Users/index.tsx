import React, { useState } from 'react';
import {
  Button,
  TextField,
  InputAdornment,
  Typography,
} from '@material-ui/core';
import { SearchOutlined } from "@material-ui/icons";

import { DataTable } from '../../components';
import SingleAddModal from "./SingleAddModal";
import BulkAddModal from "./BulkAddModal";

import "./styles.css";

const columns = [
  { field: 'name', headerName: 'Name', sortable: true },
  { field: 'teams', headerName: 'Teams', sortable: true },
  { field: 'status', headerName: 'Status', sortable: true },
  { field: 'role', headerName: 'Role', sortable: true },
  { field: 'lastlogin', headerName: 'Last Login', sortable: true },
  { field: 'action', headerName: '' }
];

const rows = [
  { name: 'Danielle Lapierre',
    teams: 'Islington Store, +1',
    status: 'Active',
    role: 'Team Lead',
    lastlogin:'5 days ago',
    action: 35
  },
];

const Users: React.FC = () => {
  const [singleModalOpened, setSingleModalOpened] = useState(false);
  const [bulkModalOpened, setBulkModalOpened] = useState(false);

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
        variant="outlined"
      />

      <Typography className="data-table-total">Active users: { rows ? rows.length : 0 }</Typography>
      <DataTable className="table" rows={rows} columns={columns} />

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

export default Users
