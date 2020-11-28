import React, { useState } from 'react';
import {
  Button,
  TextField,
  InputAdornment,
  Typography,
} from '@material-ui/core';
import { SearchOutlined } from "@material-ui/icons";

import "./styles.css";

import { DataTable } from '../../components';
import TeamAddModal from "./TeamAddModal";

const columns = [
  { field: 'team', headerName: 'Team', sortable: true },
  { field: 'members', headerName: 'Members', sortable: true },
  { field: 'lead', headerName: 'Team Lead', sortable: true },
  { field: 'action', headerName: '' },
];

const rows = [
  { team: 'Islington Store', members: 15, lead: 'Brett Ziegler, +1', action: 35 },
  { team: 'Islington Store', members: 14, lead: 'Brett Ziegler, +0', action: 30 },
];

const Teams: React.FC = () => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div className="team__Page">
      <div className="page-header">
        <Typography variant="h3" component="h1" className="page-title">Teams</Typography>
        <Button variant="outlined" className="btn-primary" onClick={() => setModalOpened(true)}>Add Team</Button>
      </div>
      <Typography className="page-description">
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

      <Typography className="data-table-total">Teams: { rows ? rows.length : 0 }</Typography>
      <DataTable className="table" rows={rows} columns={columns} />

      <TeamAddModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </div>
  )
};

export default Teams;
