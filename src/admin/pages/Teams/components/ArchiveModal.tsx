import React from 'react';
import { connect } from "react-redux";
import { Button, Typography } from '@material-ui/core';
import PropTypes from "prop-types";
import { bindActionCreators, Dispatch } from "redux";

import { Modal } from '../../../components';

import {archiveTeam} from "../../../store/teams/actions";

const propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  team: PropTypes.any,
  archiveTeam: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const ArchiveModal: React.FC<Props> = ({ opened, onClose, team, archiveTeam }) => {
  const onArchive = () => {
    archiveTeam(team.team_id);
    onClose();
  };

  return (
    <Modal
      className="user-Page-archive-modal"
      opened={opened}
      onClose={onClose}
    >
      <Typography variant="h3" component="h3">
        {team && team.is_active ? 'Are you sure you want to archive this team?' : 'Are you sure you want to recover this team?'}
      </Typography>
      <Typography className="description">
        You can reinstate them at any time from the teams menu.
      </Typography>
      <div className="actions">
        <Button
          variant="outlined"
          className="btn-primary"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          className="btn-filled"
          onClick={onArchive}
        >
          {team && team.is_active ? 'Archive Team' : 'Recover Team'}
        </Button>
      </div>
    </Modal>
  )
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  archiveTeam: bindActionCreators(archiveTeam, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(ArchiveModal);
