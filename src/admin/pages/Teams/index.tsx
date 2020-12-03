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

import { DataTable } from '../../components';
import TeamAddModal from "./TeamAddModal";

import { fetchTeams } from "../../store/teams/actions";
import { getTeams, getTotalCount } from "../../store/teams/selectors";

import "./styles.css";
import {connect} from "react-redux";

const columns = [
  { field: 'team_name', headerName: 'Team', sortable: true },
  { field: 'number_of_users', headerName: 'Members', sortable: true },
  { field: 'team_leader', headerName: 'Team Lead', sortable: true },
  { field: 'action', headerName: '' },
];

const propTypes = {
  teams: PropTypes.arrayOf(PropTypes.any).isRequired,
  total: PropTypes.number.isRequired,
  fetchTeams: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const Teams: React.FC<Props> = ({ teams, total, fetchTeams }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    fetchTeams({ page: 1, per_page: 10, keyword: '' });
  }, []);

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
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
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
