import React, { useState } from 'react';
import {
  Button,
  TextField,
  InputAdornment,
  Typography,
} from '@material-ui/core';
import { SearchOutlined } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';

import { DataTable } from '../../components';
import SingleAddModal from "./SingleAddModal";
import BulkAddModal from "./BulkAddModal";
import useSharedStyles from '../../globalStyles';

const columns = [
  { field: 'name', headerName: 'Name' },
  { field: 'teams', headerName: 'Teams' },
  { field: 'status', headerName: 'Status' },
  { field: 'role', headerName: 'Role' },
  { field: 'lastlogin', headerName: 'Last Login' },
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
  const classes = useStyles();
  const sharedClasses = useSharedStyles();
  const [singleModalOpened, setSingleModalOpened] = useState(false);
  const [bulkModalOpened, setBulkModalOpened] = useState(false);

  return (
    <>
      <div className={sharedClasses.pageHeader}>
        <Typography variant="h3" component="h1" className={sharedClasses.pageTitle}>
          Users
        </Typography>
        <div className={classes.btnGroup}>
          <Button variant="outlined" className={sharedClasses.btnPrimary} onClick={() => setSingleModalOpened(true)}>Add User</Button>
          <Button variant="outlined" className={sharedClasses.btnPrimary} onClick={() => setBulkModalOpened(true)} style={{ marginLeft: 20 }}>Bulk Add</Button>
        </div>
      </div>
      <Typography className={sharedClasses.pageDescription}>
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

      <Typography className={sharedClasses.dataTableTotal}>Teams: { rows ? rows.length : 0 }</Typography>
      <DataTable className={classes.table} rows={rows} columns={columns} />

      <SingleAddModal
        opened={singleModalOpened}
        onClose={() => setSingleModalOpened(false)}
      />

      <BulkAddModal
        opened={bulkModalOpened}
        onClose={() => setBulkModalOpened(false)}
      />
    </>
  )
};

const useStyles = makeStyles({
  table: {
    marginTop: 30
  },
  btnGroup: {
    display: 'flex',
  },
});

export default Users
