import React, { useState } from 'react';
import {
  Button,
  TextField,
  InputAdornment,
  Typography,
} from '@material-ui/core';
import { SearchOutlined } from "@material-ui/icons";

import { DataTable } from '../../components';
import AgencyAddModal from "./AgencyAddModal";

import "./styles.css";

const columns = [
  { field: 'accountName', headerName: 'Account Name', sortable: true },
  { field: 'numberOfUsers', headerName: 'Number of Users', sortable: true },
  { field: 'dataSource', headerName: 'Data Source', sortable: true },
  { field: 'status', headerName: 'Status', sortable: true },
  { field: 'action', headerName: '' },
];

const rows = [
  { accountName: 'Company', numberOfUsers: 1500, dataSource: 'Travelport, +1', status: 'Active', action: 35 },
  { accountName: 'Company', numberOfUsers: 1400, dataSource: 'Amadeus, +2', status: 'Archived', action: 35 },
];

const AgencyAccounts: React.FC = () => {
  const [modalOpened, setModalOpened] = useState(false);

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
        variant="outlined"
      />

      <Typography className="data-table-total">Agencies: { rows ? rows.length : 0 }</Typography>
      <DataTable className="table" rows={rows} columns={columns} />

      <AgencyAddModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </div>
  )
};

export default AgencyAccounts;
