import React from 'react';
import { connect } from "react-redux";
import { Button, Typography } from '@material-ui/core';
import PropTypes from "prop-types";
import { bindActionCreators, Dispatch } from "redux";

import { Modal } from '../../../components';

import {archiveAgency} from "../../../store/agencies/actions";

const propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  agency: PropTypes.any,
  archiveAgency: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const ArchiveModal: React.FC<Props> = ({ opened, onClose, agency, archiveAgency }) => {
  const onArchive = () => {
    archiveAgency(agency.agency_id);
    onClose();
  };

  return (
    <Modal
      className="user-Page-archive-modal"
      opened={opened}
      onClose={onClose}
    >
      <Typography variant="h3" component="h3">
        {agency && agency.status ? 'Are you sure you want to archive this agency?' : 'Are you sure you want to recover this agency?'}
      </Typography>
      <Typography className="description">
        You can reinstate them at any time from the agencies menu.
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
          {agency && agency.status ? 'Archive Agency' : 'Recover Agency'}
        </Button>
      </div>
    </Modal>
  )
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  archiveAgency: bindActionCreators(archiveAgency, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(ArchiveModal);
