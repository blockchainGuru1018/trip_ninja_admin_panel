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

import {DataTable, Dropdown} from '../../components';
import AgencyAddModal from "./components/AgencyAddModal";
import AgencyEditDrawer from "./components/AgencyEditDrawer";
import ArchiveModal from "./components/ArchiveModal";

import { fetchAgencies } from "../../store/agencies/actions";
import { getAgencies, getTotalCount } from "../../store/agencies/selectors";

import "./styles.css";

const propTypes = {
  agencies: PropTypes.arrayOf(PropTypes.any).isRequired,
  total: PropTypes.number.isRequired,
  fetchAgencies: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const AgencyAccounts: React.FC<Props> = ({ agencies, total, fetchAgencies }) => {
  const user = JSON.parse(localStorage.getItem('authInfo')!);
  const [modalOpened, setModalOpened] = useState<number | null>(null);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [agencySelected, selectAgency] = useState<any | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState('');

  const columns = [{
    field: 'agency_name',
    headerName: 'Account Name',
    sortable: true,
  }, {
    field: 'number_of_users',
    headerName: 'Number of Users',
    sortable: true
  }, {
    field: 'dataSource',
    headerName: 'Data Source',
    sortable: true
  }, {
    field: 'status',
    headerName: 'Status',
    sortable: true,
    getValue: (val: boolean) => val ? 'Active' : 'Deactivated'
  }, {
    field: 'status',
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
    fetchAgencies({ page: 1, per_page: 10, keyword: '' });
  }, [fetchAgencies]);

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

  const onSelectAction = (action: string, agency: any) => {
    if (action === 'edit') {
      selectAgency(agency);
      setDrawerOpened(true);
    } else if (action === 'archive') {
      selectAgency(agency);
      setModalOpened(2);
    }
  };

  const onCloseDrawer = () => {
    setDrawerOpened(false);
    selectAgency(null);
  };

  return (
    <div className="agency_Accounts-Page">
      <div className="page-header">
        <Typography variant="h3" component="h1" className="page-title">Agency Accounts</Typography>
        {user.user.is_superuser && (
          <Button variant="outlined" className="btn-primary" onClick={() => setModalOpened(1)}>
            Add Agency account
          </Button>
        )}

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
        opened={modalOpened === 1}
        onClose={() => setModalOpened(null)}
        onSuccess={() => onPageChange(1)}
      />
      <AgencyEditDrawer
        opened={drawerOpened}
        agency={agencySelected}
        onClose={onCloseDrawer}
      />
      <ArchiveModal
        opened={modalOpened === 2}
        agency={agencySelected}
        onClose={() => {
          setModalOpened(null);
          selectAgency(null);
        }}
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
