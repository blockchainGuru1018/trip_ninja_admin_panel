import React, {useEffect, useState} from 'react';
import {
  Button,
  TextField,
  InputAdornment,
  Typography,
} from '@material-ui/core';
import { SearchOutlined } from "@material-ui/icons";
import PropTypes from 'prop-types';
import { bindActionCreators, Dispatch } from "redux";

import {DataTable, Dropdown} from '../../components';
import TeamAddModal from "./components/TeamAddModal";
import TeamEditDrawer from "./components/TeamEditDrawer";
import ArchiveModal from "./components/ArchiveModal";

import { fetchTeams } from "../../store/teams/actions";
import { getTeams, getTotalCount } from "../../store/teams/selectors";

import "./styles.css";
import {connect} from "react-redux";

const propTypes = {
  teams: PropTypes.arrayOf(PropTypes.any).isRequired,
  total: PropTypes.number.isRequired,
  fetchTeams: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const Teams: React.FC<Props> = ({ teams, total, fetchTeams }) => {
  const user = JSON.parse(localStorage.getItem('authInfo')!);
  const [modalOpened, setModalOpened] = useState<number | null>(null);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [teamSelected, selectTeam] = useState<any | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState('');

  const columns = [{
    field: 'team_name',
    headerName: 'Team',
    sortable: true,
  }, {
    field: 'number_of_users',
    headerName: 'Members',
    sortable: true
  }, {
    field: 'team_leader',
    headerName: 'Team Lead',
    sortable: true
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

  if (user.user.is_superuser) {
    columns.splice(2, 0, {
        field: 'agency_name',
        headerName: 'Agency Name',
        sortable: true
    });
  }

  useEffect(() => {
    fetchTeams({ page: 1, per_page: 10, keyword: '' });
  }, [fetchTeams]);

  const onPageChange = (val: number) => {
    setPage(val);

    fetchTeams({ page: val, per_page: pageSize, keyword });
  };

  const onPageSizeChange = (size: number) => {
    setPage(1);
    setPageSize(size);

    fetchTeams({ page: 1, per_page: size, keyword });
  };

  const onKeywordChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(ev.target.value);
    setPage(1);

    fetchTeams({ page: 1, per_page: pageSize, keyword: ev.target.value });
  };

  const onSelectAction = (action: string, team: any) => {
    if (action === 'edit') {
      selectTeam(team);
      setDrawerOpened(true);
    } else if (action === 'archive') {
      selectTeam(team);
      setModalOpened(2);
    }
  };

  const onCloseDrawer = () => {
    setDrawerOpened(false);
    selectTeam(null);
  };

  return (
    <div className="team-Page">
      <div className="page-header">
        <Typography variant="h3" component="h1" className="page-title">Teams</Typography>
        <Button variant="outlined" className="btn-primary" onClick={() => setModalOpened(1)}>Add Team</Button>
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
        value={keyword}
        variant="outlined"
        onChange={onKeywordChange}
      />

      <Typography className="data-table-total">Teams: { total || 0 }</Typography>
      <DataTable
        className="table"
        rows={teams}
        columns={columns}
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />

      <TeamAddModal
        opened={modalOpened === 1}
        onClose={() => setModalOpened(null)}
        onSuccess={() => onPageChange(1)}
      />
      <TeamEditDrawer
        opened={drawerOpened}
        team={teamSelected}
        onClose={onCloseDrawer}
      />
      <ArchiveModal
        opened={modalOpened === 2}
        team={teamSelected}
        onClose={() => {
          setModalOpened(null);
          selectTeam(null);
        }}
      />
    </div>
  )
};

const mapStateToProps = (state: any) => {
  return {
    teams: getTeams(state.teams),
    total: getTotalCount(state.teams)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchTeams: bindActionCreators(fetchTeams, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Teams);
