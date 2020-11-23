import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, InputAdornment, Typography } from '@material-ui/core';
import { SearchOutlined } from "@material-ui/icons";

import { DataTable } from '../../components';
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

const Teams: React.FC = () => {
  const classes = useStyles();
  const sharedClasses = useSharedStyles();

  return (
    <>
      <div className={sharedClasses.pageHeader}>
        <Typography variant="h3" component="h1" className={sharedClasses.pageTitle}>Teams</Typography>
        <Button variant="outlined" className={sharedClasses.btnPrimary}>Add Team</Button>
      </div>
      <Typography className={sharedClasses.pageDescription}>
        Create new teams, customize team permissions, and archive teams from your account.
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

      <Typography className={classes.total}>Teams: { rows ? rows.length : 0 }</Typography>
      <DataTable className={classes.table} rows={rows} columns={columns} />
    </>
  )
};

const useStyles = makeStyles(() => ({
  total: {
    fontSize: 18,
    color: '#45565E',
    marginTop: 30
  },
  table: {
    marginTop: 15
  }
}));

export default Teams;
