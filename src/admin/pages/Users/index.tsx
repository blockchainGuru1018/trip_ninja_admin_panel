import React from 'react';
import {
  Button,
  Typography,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SearchOutlined } from "@material-ui/icons";

import { DataTable } from "../../components";
import useSharedStyles from '../../globalStyles';

const columns = [
  { field: 'team', headerName: 'Team' },
  { field: 'members', headerName: 'Members' },
  { field: 'lead', headerName: 'Team Lead' },
  { field: 'action', headerName: '' },
];

const rows = [
  { team: 'Islington Store', members: 15, lead: 'Brett Ziegler, +1', action: 35 },
];

const Users: React.FC = () => {
  const classes = useStyles();
  const sharedClasses = useSharedStyles();

  return (
    <>
      <div className={sharedClasses.pageHeader}>
        <Typography variant="h3" component="h1" className={sharedClasses.pageTitle}>
          Users
        </Typography>
        <div>
          <Button variant="outlined">Add User</Button>
          <Button variant="contained" color="primary">Bulk Add</Button>
        </div>
      </div>
      <Typography className={sharedClasses.pageDescription}>
        Create new users, customize user permissions, and remove users from your account.
      </Typography>
      <TextField
        placeholder="Search Teams"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          )
        }}
        variant="outlined"
      />

      <DataTable className={classes.table} rows={rows} columns={columns} />
    </>
  )
};

const useStyles = makeStyles({
  table: {
    marginTop: 30
  }
});

export default Users
